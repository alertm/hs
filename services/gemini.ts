
import { GoogleGenAI } from "@google/genai";

export const askHealthAssistant = async (query: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `用户咨询: ${query}. 
      作为一名专业的居家护理咨询助理，请基于用户的问题，推荐合适的护士上门服务。
      可选服务包括：打针、采血、换药、拆线、卧床护理、陪诊、导尿。
      请简洁回答，不要给医疗诊断建议，只做服务引导。`,
      config: {
        // Fix: Always set thinkingBudget when maxOutputTokens is specified for Gemini 3/2.5 models
        maxOutputTokens: 200,
        thinkingConfig: { thinkingBudget: 100 },
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "抱歉，咨询助手暂时忙碌，请直接查看首页服务列表。";
  }
};
