'use server';
/**
 * @fileOverview A flow for validating and adding new places to the local dataset.
 *
 * - addNewPlaceToDataset - A function that validates a place name using Gemini API and adds it to the local dataset.
 * - AddNewPlaceToDatasetInput - The input type for the addNewPlaceToDataset function.
 * - AddNewPlaceToDatasetOutput - The return type for the addNewPlaceToDataset function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AddNewPlaceToDatasetInputSchema = z.object({
  placeName: z.string().describe('The name of the place to validate and add.'),
});
export type AddNewPlaceToDatasetInput = z.infer<typeof AddNewPlaceToDatasetInputSchema>;

const AddNewPlaceToDatasetOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the place name is a valid location.'),
});
export type AddNewPlaceToDatasetOutput = z.infer<typeof AddNewPlaceToDatasetOutputSchema>;

export async function addNewPlaceToDataset(input: AddNewPlaceToDatasetInput): Promise<AddNewPlaceToDatasetOutput> {
  return addNewPlaceToDatasetFlow(input);
}

const validatePlacePrompt = ai.definePrompt({
  name: 'validatePlacePrompt',
  input: {schema: AddNewPlaceToDatasetInputSchema},
  output: {schema: AddNewPlaceToDatasetOutputSchema},
  prompt: `You are a geography expert. Determine if the given place name is a real place on Earth. Respond with JSON.\n\nPlace Name: {{{placeName}}}`,
});

const addNewPlaceToDatasetFlow = ai.defineFlow(
  {
    name: 'addNewPlaceToDatasetFlow',
    inputSchema: AddNewPlaceToDatasetInputSchema,
    outputSchema: AddNewPlaceToDatasetOutputSchema,
  },
  async input => {
    const {output} = await validatePlacePrompt(input);
    // Here, in a real implementation, you would also add the validated
    // place to your local dataset for future use.
    return output!;
  }
);
