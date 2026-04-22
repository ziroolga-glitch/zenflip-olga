
import { GoogleGenerativeAI } from "@google/generative-ai";
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

// Χρησιμοποιούμε το σωστό όνομα βιβλιοθήκης παντού
const genAI = new GoogleGenerativeAI("AIzaSyDtw9J5LslyiIoP0e8biVyn5uVeJDxrjkk");

export const generateCardContent = async (): Promise<CardData[]> => {
  return SPECIFIC_QUESTIONS.map((q, i) => ({
    id: `card-${i}`,
    question: q,
    category: "Art"
  }));
};

export const generateAIImage = async (prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`Abstract art: ${prompt}`);
    const response = await result.response;
    return "https://images.unsplash.com/photo-1549490349-8643362247b5";
  } catch (err) {
    return "https://images.unsplash.com/photo-1549490349-8643362247b5";
  }
};
