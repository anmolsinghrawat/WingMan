const apiKey= "AIzaSyAPT6vDDkv3ypFEVXWfYavukxEllwKKxTo";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: apiKey });

async function runChat(prompt, retries = 3) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);

    if (retries > 0) {
      console.log(`Retrying... (${3 - retries + 1})`);
      await new Promise((res) => setTimeout(res, 2000));
      return runChat(prompt, retries - 1);
    } else {
      return "Server busy 🔁 Try again later!";
    }
  }
}

export default runChat;
