import { GoogleGenAI, Type } from "@google/genai";
import { Company, Country } from "../types";

// POPRAWKA 1: Zmiana na standard Vite/Netlify, aby system widział Twój klucz VITE_API_KEY
const API_KEY = import.meta.env.VITE_API_KEY;

export const translateQuery = async (
  query: string,
  country: Country
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Jesteś ekspertem od analizy rynkowej i tłumaczeń biznesowych. 
  Przetłumacz polską frazę branżową: "${query}" na język urzędowy kraju: ${country}.
  
  Zasady:
  1. Zwróć TYLKO przetłumaczony termin lub frazę.
  2. Nie dodawaj żadnych wyjaśnień.
  3. Jeśli termin jest międzynarodowy, zwróć go bez zmian.`;

  try {
    const response = await ai.models.generateContent({
      // POPRAWKA 2: Zmiana na istniejący model gemini-1.5-flash
      model: "gemini-1.5-flash",
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

  const discoveryPrompt = `Wykonaj zadanie zgodnie z PROTOKOŁEM "DIRECT DOMAIN SEARCH" dla frazy "${query}" ${locationPrompt}.
  WYNIK: Zwróć listę firm (do 15 rekordów) z polami: nazwa, adres, telefon, rating, reviewCount oraz surowy link WWW.`;

  try {
    const discoveryResponse = await ai.models.generateContent({
      // POPRAWKA 3: Zmiana na istniejący model gemini-1.5-flash
      model: "gemini-1.5-flash", 
      contents: discoveryPrompt,
      config: {
        tools: [{ googleMaps: {} }, { googleSearch: {} }],
      },
    });

    const discoveryText = discoveryResponse.text || "";
    
    const enrichmentPrompt = `Przeanalizuj poniższe dane i przygotuj finalny JSON.
    DANE WEJŚCIOWE: ${discoveryText}
    Zwróć JSON (tablica obiektów).`;

    const enrichmentResponse = await ai.models.generateContent({
      // POPRAWKA 4: Zmiana na stabilny model gemini-1.5-flash (lub gemini-1.5-pro)
      model: "gemini-1.5-flash",
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

    const aggregatorKeywords = ['instagram.com', 'linkedin.com', 'yelp.', 'zumi.pl', 'olx.'];

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
