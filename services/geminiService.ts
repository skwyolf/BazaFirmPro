
import { GoogleGenAI, Type } from "@google/genai";
import { Company, Country } from "../types";

export const translateQuery = async (
  query: string,
  country: Country
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Jesteś ekspertem od analizy rynkowej i tłumaczeń biznesowych. 
  Przetłumacz polską frazę branżową: "${query}" na język urzędowy kraju: ${country}.
  
  Zasady:
  1. Zwróć TYLKO przetłumaczony termin lub frazę, która najlepiej oddaje specyfikę branży w tym kraju.
  2. Nie dodawaj żadnych wyjaśnień, cudzysłowów ani kropek.
  3. Jeśli termin jest międzynarodowy (np. "Hotel", "IT") i brzmi tak samo, zwróć go bez zmian.
  4. Jeśli fraza jest skomplikowana, użyj najbardziej powszecnego terminu biznesowego stosowanego w rejestrach firm.
  
  Przykłady:
  PL: maszyny rolnicze, Kraj: Germany -> Landmaschinen
  PL: maszyny rolnicze, Kraj: Romania -> Utilaje agricole
  PL: hotel, Kraj: Germany -> Hotel`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error in translateQuery:", error);
    return query; // Fallback to original
  }
};

export const fetchCompanies = async (
  query: string,
  country: Country,
  locations: string[]
): Promise<Company[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const locationPrompt = locations.length > 0 
    ? `w wybranych regionach: ${locations.join(', ')}`
    : `w całym kraju: ${country}`;

  /**
   * PROTOKÓŁ "DIRECT DOMAIN SEARCH" - FAZA 1: Discovery & Targeted Search
   */
  const discoveryPrompt = `Wykonaj zadanie zgodnie z rygorystycznym PROTOKOŁEM "DIRECT DOMAIN SEARCH" dla frazy "${query}" ${locationPrompt}.

ZASADY POZYSKIWANIA WWW (OBOWIĄZKOWE):
1. Dla każdego regionu wykonaj główne zapytanie w Google Maps.
2. JEŚLI w Google Maps brakuje bezpośredniego adresu WWW (lub jest to link do FB/katalogu):
   - MASZ OBOWIĄZEK wykonać dedykowane zapytanie w Google Search: "[Nazwa Firmy] + [Miasto] + official website".
   - Szukaj WYŁĄCZNIE bezpośrednich domen biznesowych (np. firma.pl, brand.de).
3. ABSOLUTNY ZAKAZ akceptowania linków do: Facebook, Instagram, LinkedIn, Yelp, YellowPages, Bizoo, Panorama Firm, PKT, OLX.
4. JEŚLI po dedykowanym zapytaniu znajdziesz TYLKO profil na Facebooku:
   - Spróbuj wejść w profil i wyciągnąć link "Witryna". Jeśli go nie ma, zwróć link do profilu FB z dopiskiem "(Tylko FB)".
5. FILTR JAKOŚCI:
   - Jeśli firma ma 0 opinii i brak strony WWW (nawet FB) -> OZNACZ jako "Low Potential" i pomiń.

WYNIK: Zwróć listę firm (do 10-15 najlepszych) z polami: nazwa, adres, telefon, rating, reviewCount oraz surowy link WWW.`;

  try {
    const discoveryResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: discoveryPrompt,
      config: {
        tools: [{ googleMaps: {} }, { googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    const discoveryText = discoveryResponse.text || "";
    
    /**
     * FAZA 2: Rygorystyczna Weryfikacja i Formatowanie Wyjścia
     */
    const enrichmentPrompt = `Przeanalizuj poniższe dane i przygotuj finalny JSON. Skup się na czystości adresów WWW.

DANE WEJŚCIOWE:
${discoveryText}

ZASADY FINALNEJ WERYFIKACJI:
1. "Strona WWW" musi być najbardziej prawdopodobnym linkiem bezpośrednim.
2. Jeśli link prowadzi do aggregatora (FB, LinkedIn itp.), zamień go na "Wymaga weryfikacji ręcznej", CHYBA ŻE jest to jedyny kontakt - wtedy dopisz "(Tylko FB)".
3. Jeśli adres WWW to czysta domena (np. www.firma.com), zostaw ją jako priorytet.
4. Usuń firmy bez telefonu lub bez adresu.
5. Sformatuj telefony do standardu międzynarodowego.

Zwróć JSON (tablica obiektów).`;

    const enrichmentResponse = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: enrichmentPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              address: { type: Type.STRING },
              phone: { type: Type.STRING },
              website: { type: Type.STRING, description: "Official domain, 'Strona WWW (Tylko FB)' or 'Wymaga weryfikacji ręcznej'" },
              rating: { type: Type.NUMBER, nullable: true },
              reviewCount: { type: Type.NUMBER, nullable: true }
            },
            required: ["name", "address", "phone", "website"]
          }
        }
      }
    });

    const results = JSON.parse(enrichmentResponse.text.trim()) as Company[];

    // Ostatnia linia obrony - czyszczenie aggregatów
    const aggregatorKeywords = [
      'instagram.com', 'linkedin.com', 'yelp.', 'tripadvisor.', 
      'panoramafirm.pl', 'pkt.pl', 'yellowpages', 'dastelefonbuch', 
      'herold.at', 'zumi.pl', 'olx.', 'katalog'
    ];

    return results.map(c => {
      let url = c.website || 'Wymaga weryfikacji ręcznej';
      
      // Jeśli to Facebook, pozwalamy tylko jeśli ma dopisek (Tylko FB) zgodnie z instrukcją formatowania
      if (url.toLowerCase().includes('facebook.com') && !url.includes('(Tylko FB)')) {
        url = url + ' (Tylko FB)';
      }

      // Całkowita blokada innych aggregatów
      if (aggregatorKeywords.some(term => url.toLowerCase().includes(term))) {
        url = 'Wymaga weryfikacji ręcznej';
      }
      
      return { ...c, website: url };
    });

  } catch (error) {
    console.error("Critical error in fetchCompanies with Direct Domain Protocol:", error);
    throw error;
  }
};
