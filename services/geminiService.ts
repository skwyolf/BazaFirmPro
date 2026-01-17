import { GoogleGenAI, Type } from "@google/genai";

// Pobieranie klucza z Netlify
const API_KEY = import.meta.env.VITE_API_KEY;

export const translateQuery = async (query: string, country: any): Promise<string> => {
  if (!API_KEY) return query;
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // Używamy na 100% istniejącego modelu
      contents: `Przetłumacz: "${query}" na język kraju: ${country}. Zwróć tylko wynik.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Błąd tłumaczenia:", error);
    return query;
  }
};

export const fetchCompanies = async (query: string, country: any, locations: string[]): Promise<any[]> => {
  if (!API_KEY) throw new Error("Brak klucza API w ustawieniach Netlify");

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const loc = locations.length > 0 ? locations.join(', ') : country;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Znajdź 10 firm z branży ${query} w ${loc}. Zwróć dane w formacie JSON.`,
      config: { 
        tools: [{ googleMaps: {} }, { googleSearch: {} }],
        responseMimeType: "application/json"
      },
    });
    
    // Zabezpieczenie przed błędnym formatem JSON
    const text = response.text.trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Błąd pobierania firm:", error);
    return [];
  }
};
