import { GoogleGenAI } from "@google/genai";

// Pobieranie klucza z Netlify
const API_KEY = import.meta.env.VITE_API_KEY;

export const translateQuery = async (query: string, country: any): Promise<string> => {
  if (!API_KEY) return query;
  const genAI = new GoogleGenAI(API_KEY);
  try {
    // Model 1.5-flash jest jedynym darmowym modelem z gwarancją działania
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`Przetłumacz: "${query}" na język: ${country}.`);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Błąd tłumaczenia:", error);
    return query;
  }
};

export const fetchCompanies = async (query: string, country: any, locations: string[]): Promise<any[]> => {
  if (!API_KEY) return [];
  const genAI = new GoogleGenAI(API_KEY);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const loc = locations.length > 0 ? locations.join(', ') : country;
    const prompt = `Znajdź 10 firm z branży ${query} w ${loc}. Zwróć dane w formacie JSON: [{"name": "...", "address": "...", "phone": "...", "website": "..."}]`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonMatch = text.match(/\[.*\]/s);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  } catch (error) {
    console.error("Błąd pobierania firm:", error);
    return [];
  }
};
