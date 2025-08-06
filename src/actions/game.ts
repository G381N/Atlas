"use server";

import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { app } from "@/lib/firebase";
import {
  addNewPlaceToDataset,
  type AddNewPlaceToDatasetOutput,
} from "@/ai/flows/add-new-place-to-dataset";

export interface ValidatePlaceInput {
  placeName: string;
}

export interface ValidatePlaceOutput {
  isValid: boolean;
  suggestedCorrection?: string;
}

export async function validatePlace(
  input: ValidatePlaceInput
): Promise<ValidatePlaceOutput> {
  const db = getFirestore(app);
  const placeRef = doc(db, "places", input.placeName.toLowerCase());

  try {
    const placeSnap = await getDoc(placeRef);

    if (placeSnap.exists()) {
      return { isValid: true };
    } else {
      // If not in our DB, validate with AI and maybe add it
      const aiResult: AddNewPlaceToDatasetOutput = await addNewPlaceToDataset({
        placeName: input.placeName,
      });

      if (aiResult.isValid) {
        // Add to our dataset for future checks
        await setDoc(placeRef, { name: input.placeName.toLowerCase() });
        return { isValid: true };
      }

      // The AI might still have a suggestion even if it's not valid
      // in the context of adding it to the dataset.
      // For now, we will just return the validity. A more complex implementation
      // could be to use the `validatePlaceName` flow here as well.
      return { isValid: false };
    }
  } catch (error) {
    console.error("Error validating place:", error);
    // Fallback to AI if Firestore check fails for some reason
    try {
      const result = await addNewPlaceToDataset({ placeName: input.placeName });
      return result;
    } catch (aiError) {
      console.error("Error validating place with AI:", aiError);
      return { isValid: false };
    }
  }
}

export async function saveScore(score: number, user: string) {
  const db = getFirestore(app);
  // In a real app, user would be an ID.
  const scoreRef = doc(collection(db, "scores"), user); 
  await setDoc(scoreRef, {
    name: user,
    score: score,
    country: "🇺🇳", // Placeholder country
    createdAt: new Date(),
  }, { merge: true });
}
