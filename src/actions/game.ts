"use server";

import { validatePlaceName, type ValidatePlaceNameInput, type ValidatePlaceNameOutput } from "@/ai/flows/validate-place-name";

export async function validatePlace(input: ValidatePlaceNameInput): Promise<ValidatePlaceNameOutput> {
  try {
    const result = await validatePlaceName(input);
    return result;
  } catch (error) {
    console.error("Error validating place:", error);
    // In a real app, you'd want more robust error handling and logging.
    return { isValid: false };
  }
}
