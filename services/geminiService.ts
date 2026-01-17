import { GoogleGenAI } from "@google/genai";
import { Company, Country } from "../types";

// Pobieranie klucza z Netlify
const API_KEY = import.meta.env.VITE_API_KEY;

// Inicjalizacja SDK Google AI
const genAI = new GoogleGenAI(API_KEY);

export const translateQuery = async (query: string, country: Country): Promise<string> => {
  // Używamy modelu 1.5-flash (najbardziej niezawodny)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const prompt = `Przetłumacz frazę biznesową: "${query}" na język kraju: ${country}. Zwróć tylko wynik.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Błąd tłumaczenia:", error);
    return query;
  }
};

export const fetchCompanies = async (query: string, country: Country, locations: string[]): Promise<Company[]> => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const locationText = locations.length > 0 ? locations.join(', ') : country;
    const prompt = `Znajdź 10 firm z branży ${query} w: ${locationText}. 
    Zwróć TYLKO czysty format JSON: 
    [{"name": "...", "address": "...", "phone": "...", "website": "...", "rating": 4.5, "reviewCount": 10}]`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Wyciąganie JSONa z tekstu (zabezpieczenie)
    const jsonMatch = text.match(/\[.*\]/s);
    if (!jsonMatch) return [];
    
    return JSON.parse(jsonMatch[0]) as Company[];
  } catch (error) {
    console.error("Błąd pobierania firm:", error);
    throw error;
  }
};
