
import { GoogleGenAI, Type } from "@google/genai";
import { Company, Country } from "../types";

// Klucz API musi być pobierany z process.env.API_KEY zgodnie z wytycznymi bezpieczeństwa
const API_KEY = process.env.API_KEY;

export const translateQuery = async (
  query: string,
  country: Country
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Jesteś ekspertem od analizy rynkowej i tłumaczeń biznesowych. 
  Przetłumacz polską frazę branżową: "${query}" na język urzędowy kraju: ${country}.
  
  Zasady:
  1. Zwróć TYLKO przetłumaczony termin lub frazę, która najlepiej oddaje specyfikę branży w tym kraju.
  2. Nie dodawaj żadnych wyjaśnień, cudzysłowów ani kropek.
  3. Jeśli termin jest międzynarodowy (np. "Hotel", "IT") i brzmi tak samo, zwróć go bez zmian.
  
  Przykłady:
  PL: maszyny rolnicze, Kraj: Germany -> Landmaschinen`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error in translateQuery:", error);
    return query;
  }
};

export const fetchCompanies = async (
  query: string,
  country: Country,
  locations: string[]
): Promise<Company[]> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const locationPrompt = locations.length > 0 
    ? `w wybranych regionach: ${locations.join(', ')}`
    : `w całym kraju: ${country}`;

  /**
   * PROTOKÓŁ "DIRECT DOMAIN SEARCH" - FAZA 1: Discovery
   * WAŻNE: Narzędzie googleMaps jest wspierane WYŁĄCZNIE w serii Gemini 2.5.
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
   - Jeśli firma ma 0 opinii i brak strony WWW -> OZNACZ jako "Low Potential" i pomiń.

WYNIK: Zwróć listę firm (do 15 rekordów) z polami: nazwa, adres, telefon, rating, reviewCount oraz surowy link WWW.`;

  try {
    // Używamy modelu gemini-2.5-flash, aby uniknąć błędu "Google Maps tool is not enabled for this model"
    const discoveryResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: discoveryPrompt,
      config: {
        tools: [{ googleMaps: {} }, { googleSearch: {} }],
      },
    });

    const discoveryText = discoveryResponse.text || "";
    
    /**
     * FAZA 2: Rygorystyczna Weryfikacja (Gemini 3 Pro)
     * Model Pro zapewnia najlepszą strukturę JSON i logiczną weryfikację domen.
     */
    const enrichmentPrompt = `Przeanalizuj poniższe dane i przygotuj finalny JSON. Skup się na czystości adresów WWW i formacie danych.

DANE WEJŚCIOWE:
${discoveryText}

ZASADY FINALNEJ WERYFIKACJI:
1. "Strona WWW" musi być najbardziej prawdopodobnym linkiem bezpośrednim.
2. Jeśli link prowadzi do aggregatora (FB, LinkedIn itp.), zamień go na "Wymaga weryfikacji ręcznej", CHYBA ŻE jest to profil Facebook z dopiskiem "(Tylko FB)".
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
              website: { type: Type.STRING },
              rating: { type: Type.NUMBER, nullable: true },
              reviewCount: { type: Type.NUMBER, nullable: true }
            },
            required: ["name", "address", "phone", "website"]
          }
        }
      }
    });

    const results = JSON.parse(enrichmentResponse.text.trim()) as Company[];

    const aggregatorKeywords = [
      'instagram.com', 'linkedin.com', 'yelp.', 'tripadvisor.', 
      'panoramafirm.pl', 'pkt.pl', 'yellowpages', 'dastelefonbuch', 
      'herold.at', 'zumi.pl', 'olx.', 'katalog'
    ];

    return results.map(c => {
      let url = c.website || 'Wymaga weryfikacji ręcznej';
      
      if (url.toLowerCase().includes('facebook.com') && !url.includes('(Tylko FB)')) {
        url = url + ' (Tylko FB)';
      }

      if (aggregatorKeywords.some(term => url.toLowerCase().includes(term))) {
        url = 'Wymaga weryfikacji ręcznej';
      }
      
      return { ...c, website: url };
    });

  } catch (error) {
    console.error("Critical error in fetchCompanies:", error);
    throw error;
  }
};
