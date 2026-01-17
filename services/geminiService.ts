import { GoogleGenAI } from "@google/genai";

// 1. Pobieramy klucz (musi być VITE_API_KEY w Netlify)
const API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenAI(API_KEY);

export const translateQuery = async (query: string, country: string): Promise<string> => {
  try {
    // 2. Używamy modelu gemini-1.5-flash - on istnieje i jest darmowy
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Przetłumacz frazę: "${query}" na język kraju: ${country}. Zwróć tylko wynik.`;
    
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Błąd tłumaczenia:", error);
    return query;
  }
};

export const fetchCompanies = async (query: string, country: string, locations: string[]): Promise<any[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const loc = locations.length > 0 ? locations.join(', ') : country;
    
    // 3. Skupiamy się na samym tekście, bez problematycznych narzędzi Maps/Search
    const prompt = `Znajdź 10 firm z branży ${query} w lokalizacji ${loc}. 
    Zwróć TYLKO czysty JSON: [{"name": "...", "address": "...", "phone": "...", "website": "..."}]`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Wyciągamy JSON z odpowiedzi (AI czasem dodaje ```json ... ```)
    const jsonMatch = text.match(/\[.*\]/s);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  } catch (error) {
    console.error("Błąd pobierania firm:", error);
    return [];
  }
};
