import { GoogleGenAI } from "@google/genai";
import { ContentType, ResponseLength } from '../types';

const PROMPT_INSTRUCTIONS: Record<ContentType, string> = {
  [ContentType.Article]: "Write a comprehensive, well-structured article on the following topic. Use clear headings, engaging language, and provide detailed information in a cyberpunk, futuristic tone. Format the response in Markdown.",
  [ContentType.Summary]: "Provide a concise and accurate summary of the following text or topic. Capture the main points and key takeaways. The tone should be sharp and technological. Format the response in Markdown.",
  [ContentType.Caption]: "Generate an engaging and creative social media caption for the following topic or idea. Make it sound like it's from a high-tech future. Include relevant futuristic hashtags and a compelling call-to-action.",
  [ContentType.Paragraph]: "Write a clear and coherent paragraph about the following subject. Ensure it is well-written, focused, and has a distinct cyberpunk feel.",
};

const RESPONSE_LENGTH_MAP: Record<ResponseLength, number> = {
    short: 512,
    medium: 1024,
    long: 2048,
};

export const generateContentStream = async (
  prompt: string,
  contentType: ContentType,
  onStream: (chunk: string) => void,
  temperature: number,
  responseLength: ResponseLength
): Promise<void> => {
  // Defer API key check and client initialization to the moment of the request.
  // This ensures the app can load and render even if the API key is not yet available.
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    console.error("API_KEY is not set in environment variables.");
    throw new Error("API Key is missing. For security, the key is not hardcoded. Please configure the API_KEY as an environment variable to use the generator.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const fullPrompt = `${PROMPT_INSTRUCTIONS[contentType]}\n\nTOPIC: "${prompt}"`;
    const maxOutputTokens = RESPONSE_LENGTH_MAP[responseLength];
    const thinkingBudget = Math.floor(maxOutputTokens / 4);
    
    const stream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        temperature,
        maxOutputTokens,
        thinkingConfig: { thinkingBudget },
      }
    });

    for await (const chunk of stream) {
      onStream(chunk.text);
    }

  } catch (error) {
    console.error('Error generating content from Gemini API:', error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            throw new Error('The provided API key is not valid. Please check your configuration.');
        }
        // Re-throw a generic but informative error for other API issues.
        throw new Error('An error occurred while communicating with the AI. Please check the console and try again.');
    }
    // Throw for non-Error objects
    throw new Error('An unknown error occurred while generating content.');
  }
};