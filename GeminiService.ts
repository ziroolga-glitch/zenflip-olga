
import { GoogleGenAI } from "@google/genai";
import { CardData } from "./types";

const SPECIFIC_QUESTIONS = [
  "ρώτησε το έργο που βλέπεις 'τι θέλεις';",
  "μπορείς να περιγράψεις τι βλέπεις;",
  "τι είναι αυτό που σου κάνει εντύπωση",
  "Τι είναι αυτό που σου αρέσει περισσότερο σε αυτό που βλέπεις",
  "Τι θέλεις να μάθεις για το περιεχόμενο του έργου που βλέπεις;",
  "Ποιά μορφή, σχήμα, χρώμα νομίζεις ότι σου απευθύνεται;",
  "Τι νομίζεις ότι θέλει να σου πει ο καλλιτέχνης;",
  "Μπορείς να βρεις ένα τίτλο δικό σου για το έργο;",
  "Αν σου ζητούσαν να αφαιρέσεις κάτι από το έργο, τι θα αφαιρούσες;",
  "Αν σου ζητούσαν να προσθέσεις κάτι στο έργο, τι θα πρόσθετες;",
  "Αν βρισκόσουν μέσα στο έργο τι θέση θα έπαιρνες;",
  "Ποιό ερώτημα νομίζεις ότι δημιουργεί το έργο;",
  "Αν αυτό το έργο είχε φωνή τι θα έλεγε;",
  "Με ποιό επίθετο θα χαρακτήριζες το έργο;",
  "Ποιό στοιχείο του έργου παγώνει τον χρόνο;",
  "Με ποιό γεγονός της ζωής θα το συνέδεες;",
  "Αν κλείσεις τα μάτια τι θυμάσαι;",
  "Τι θα ακολουθούσε αν ο χρόνος κυλούσε;",
  "Τι μουσική θα του ταίριαζε;",
  "Τι θα ρωτούσες τον καλλιτέχνη;"
];

export const generateCardContent = async (): Promise<CardData[]> => {
  return SPECIFIC_QUESTIONS.map((q, i) => ({
    id: `card-${i}`,
    question: q,
    category: "Art"
  }));
};

export const generateAIImage = async (prompt: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ text: `Ethereal abstract art, museum quality, representing the concept: ${prompt}` }] 
      },
      config: { imageConfig: { aspectRatio: "3:4" } }
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return "https://images.unsplash.com/photo-1549490349-8643362247b5";
  } catch (err) {
    return "https://images.unsplash.com/photo-1549490349-8643362247b5";
  }
};


