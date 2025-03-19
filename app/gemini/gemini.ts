import { GoogleGenerativeAI } from '@google/generative-ai'
import { safetySettings } from './geminiSafetySettings'

const APIKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(APIKey as string)
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
        candidateCount: 1,
        temperature: 1
    },
    safetySettings: safetySettings
})

export const generateWithGemini = async (prompt: string) => {
    const result = await model.generateContent(prompt)
    return result.response.text()
}