
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
import {
  validatePlaceName,
  type ValidatePlaceNameInput,
  type ValidatePlaceNameOutput,
} from "@/ai/flows/validate-place-name";

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
  const placeNameLower = input.placeName.toLowerCase();
  const placeRef = doc(db, "places", placeNameLower);

  try {
    const placeSnap = await getDoc(placeRef);

    if (placeSnap.exists()) {
      return { isValid: true };
    } else {
      // If not in our DB, validate with AI. We use the more powerful flow here.
      const aiResult = await validatePlaceName({
        placeName: input.placeName,
        category: "Any",
      });

      if (aiResult.isValid) {
        // Add to our dataset for future checks
        await setDoc(placeRef, { name: placeNameLower });
        return { isValid: true };
      }

      return {
        isValid: false,
        suggestedCorrection: aiResult.suggestedCorrection,
      };
    }
  } catch (error) {
    console.error("Error validating place:", error);
    // Fallback to AI if Firestore check fails for some reason
    try {
      const result = await validatePlaceName({
        placeName: input.placeName,
        category: "Any",
      });
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
  await setDoc(
    scoreRef,
    {
      name: user,
      score: score,
      country: "🇺🇳", // Placeholder country
      createdAt: new Date(),
    },
    { merge: true }
  );
}
