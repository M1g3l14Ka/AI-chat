import { GoogleGenerativeAI } from '@google/generative-ai';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(message);
    const response = result.response;

    res.status(200).json({ reply: response.text() });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'AI detected an error :(, try again please' });
  }
}
