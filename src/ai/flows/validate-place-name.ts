'use server';

/**
 * @fileOverview This file implements a Genkit flow to validate a place name using the Gemini API.
 *
 * The flow uses fuzzy matching and suggests corrections if the input is close to a valid place name.
 *
 * @interface ValidatePlaceNameInput - Input schema for the validatePlaceName flow.
 * @interface ValidatePlaceNameOutput - Output schema for the validatePlaceName flow.
 * @function validatePlaceName - The exported function to validate a place name.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidatePlaceNameInputSchema = z.object({
  placeName: z.string().describe('The place name to validate.'),
  category: z
    .enum(['Countries', 'Capitals', 'Countries + Capitals + States', 'Any'])
    .describe('The category of place names to validate against.'),
});
export type ValidatePlaceNameInput = z.infer<typeof ValidatePlaceNameInputSchema>;

const ValidatePlaceNameOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the place name is valid.'),
  suggestedCorrection: z.string().optional().describe('A suggested correction if the place name is invalid.'),
});
export type ValidatePlaceNameOutput = z.infer<typeof ValidatePlaceNameOutputSchema>;

export async function validatePlaceName(input: ValidatePlaceNameInput): Promise<ValidatePlaceNameOutput> {
  return validatePlaceNameFlow(input);
}

const validatePlaceNamePrompt = ai.definePrompt({
  name: 'validatePlaceNamePrompt',
  input: {schema: ValidatePlaceNameInputSchema},
  output: {schema: ValidatePlaceNameOutputSchema},
  prompt: `You are a geography expert.  Your task is to validate if a given place name is a real place, \
  optionally within a specific category (countries, capitals, states, or any real place). \
  You should handle misspellings and suggest corrections if the provided place name is close to a real one.\
  Be case insensitive in your matching.

  Place Name: {{{placeName}}}
  Category: {{{category}}}

  Respond with a JSON object that contains two fields:\
  - isValid (boolean): true if the place name is valid, false otherwise.\
  - suggestedCorrection (string, optional): A suggested correction if the place name is invalid and you can find a close match.
  If you cannot find a close match, do not include this field.

  Example 1:
  Input: { placeName: "Pari", category: "Capitals" }
  Output: { isValid: false, suggestedCorrection: "Paris" }

  Example 2:
  Input: { placeName: "London", category: "Capitals" }
  Output: { isValid: true }

  Example 3:
  Input: { placeName: "Atlantis", category: "Any" }
  Output: { isValid: false }

  Example 4:
  Input: { placeName: "United States of Amercia", category: "Countries" }
  Output: { isValid: false, suggestedCorrection: "United States of America" }

  Make sure the suggestedCorrection is a real place name.
`,
});

const validatePlaceNameFlow = ai.defineFlow(
  {
    name: 'validatePlaceNameFlow',
    inputSchema: ValidatePlaceNameInputSchema,
    outputSchema: ValidatePlaceNameOutputSchema,
  },
  async input => {
    const {output} = await validatePlaceNamePrompt(input);
    return output!;
  }
);
