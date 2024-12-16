import { gemini15Flash, googleAI } from '@genkit-ai/googleai'
import { genkit } from 'genkit'

export class AIProvider {
  createGemini15Flash() {
    const ai = genkit({
      plugins: [
        googleAI({
          apiKey: process.env.GOOGLE_GENAI_API_KEY,
        }),
      ],
      model: gemini15Flash,
    })
    return ai
  }
}
