
import { GoogleGenAI } from "@google/genai";
import { CardData } from "./types";

const SPECIFIC_QUESTIONS_MAP: Record<number, string> = {
  0: "ρώτησε το έργο που βλέπεις 'τι θέλεις';",
  1: "μπορείς να περιγράψεις τι βλέπεις;",
  2: "τι είναι αυτό που σου κάνει εντύπωση",
  3: "Τι είναι αυτό που σου αρέσει περισσότερο σε αυτό που βλέπεις",
  4: "Τι θέλεις να μάθεις για το περιεχόμενο του έργου που βλέπεις;",
  5: "Ποιά μορφή, σχήμα, χρώμα νομίζεις ότι σου απευθύνεται;",
  6: "Τι νομίζεις ότι θέλει να σου πει ο καλλιτέχνης;",
  7: "Μπορείς να βρεις ένα τίτλο δικό σου για το έργο;",
  8: "Αν σου ζητούσαν να αφαιρέσεις κάτι από το έργο, τι θα αφαιρούσες;",
  9: "Αν σου ζητούσαν να προσθέσεις κάτι στο έργο, τι θα πρόσθετες;",
  10: "Αν βρισκόσουν μέσα στο έργο τι θέση θα έπαιρνες; κοντά σε ποιό πρόσωπο, κοντά σε ποιό σχήμα, κοντά σε ποιό χρώμα;",
  11: "Ποιό ερώτημα ή σκέψη νομίζεις ότι δημιουργεί το έργο που είναι το ίδιο από τότε που δημιουργήθηκε έως σήμερα;",
  12: "Αν αυτό το έργο είχε φωνή τι θα έλεγε; Θα το φώναζε ή θα το ψυθίριζε;",
  13: "Με ποιό επίθετο θα χαρακτήριζες το έργο: σκληρό, μαλακό, επιθετικό, καθησυχαστικό.",
  14: "Ποιό στοιχείο του έργου σου δημιουργεί την αίσθηση ότι εκεί ο χρόνος πάγωσε;",
  15: "Με ποιό γεγονός της σύγχρονης ζωής θα συνέδεες μεταφορικά αυτό που βλέπεις;",
  16: "Αν κλείσεις τα μάτια τι θυμάσαι από το έργο, ποιό στοιχείο του παραμένει;",
  17: "Αν εκτυλισσόταν στο χρόνο αυτό που βλέπεις τι θα ακολουθούσε;",
  18: "αν το έργο είχε μουσική υπόκρουση θα του ταίριαζε μελωδικός ήχος ή ήχος με ένταση;",
  19: "τι θα ήθελες να ρωτήσεις τον καλλιτέχνη αν τον είχες μπροστά σου;"
};

export const generateCardContent = async (): Promise<CardData[]> => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `card-${i}`,
    question: SPECIFIC_QUESTIONS_MAP[i],
    category: "Τέχνη & Στοχασμός"
  }));
};

export const generateAIImage = async (prompt: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `Create a cinematic, museum-quality art visualization of this thought: "${prompt}". Style: Philosophical expressionism, ethereal atmosphere, masterfully lit, textured oil painting meets modern digital art. Avoid text in the image.` }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data received");
  } catch (error) {
    console.error("Image generation failed:", error);
    return `https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800`;
  }
};
