import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_API_KEY;

// Inicjalizacja klienta tylko jeśli klucz istnieje
const genAI = API_KEY ? new GoogleGenAI(API_KEY) : null;

export const translateQuery = async (query: string, country: any): Promise<string> => {
  if (!genAI) {
    console.error("Brak klucza API!");
    return query;
  }

  try {
    // Próbujemy użyć nazwy 'gemini-1.5-flash' bez dodatkowych przedrostków
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Przetłumacz: "${query}" na język kraju: ${country}. Zwróć tylko wynik.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Błąd tłumaczenia:", error);
    return query; // Zwróć oryginał zamiast błędu
  }
};

export const fetchCompanies = async (query: string, country: any, locations: string[]): Promise<any[]> => {
  if (!genAI) {
    console.error("Brak klucza API!");
    return [];
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const loc = locations.length > 0 ? locations.join(', ') : country;
    const prompt = `Znajdź 5 firm z branży ${query} w ${loc}. Zwróć JSON: [{"name": "...", "address": "...", "phone": "...", "website": "..."}]`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\[.*\]/s);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    return []; // Zwróć pustą listę zamiast "nicnierobienia"
  }
};
