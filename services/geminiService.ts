import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CategoryId } from '../types';

const getMockData = (category: CategoryId, tier: string) => {
  if (category === 'undergrad') {
    if (tier === 'S') return { schools: ['东京大学', '早稻田大学', '庆应义塾'], comment: "硬件条件非常出色！建议重点准备EJU留考的高分段突破，同时着重练习校内考面试（面接），这是冲击旧帝大的关键。" };
    if (tier === 'A') return { schools: ['明治大学', '千叶大学', '同志社大学'], comment: "基础扎实，是MARCH类名校青睐的生源。目前的短板可能在于口语，建议赴日后重点强化面试对答技巧。" };
    return { schools: ['日东专驹', '语言学校', '地方国公立'], comment: "日本考学制最大的魅力就是逆袭。通过语言学校过渡，利用一年时间专心备考EJU和校内考，完全有机会翻盘。" };
  } else if (category === 'art') {
    if (tier === 'S') return { schools: ['东京艺术大学', '多摩美术大学', '武藏野美术大学'], comment: "您的作品集与语言能力已达到顶尖水平。建议直接尝试联系教授，并针对东艺大的实技考试进行针对性训练。" };
    return { schools: ['京都精华大学', '东京造形大学', '语言学校'], comment: "艺术生作品集是灵魂。建议尽早寻找对应风格的教授，利用语言学校过渡期间打磨出一套高质量作品集。" };
  } else {
    if (tier === 'S') return { schools: ['东京大学', '东京工业大学', '京都大学'], comment: "完美的学术背景！建议直接尝试联系教授（套磁）申请研究生或SGU项目，注意研究计划书的学术深度。" };
    return { schools: ['筑波大学', '横滨国立大学', '上智大学'], comment: "背景有竞争力。建议花大量时间阅读目标教授的论文，写出一份逻辑严密的研究计划书是制胜关键。" };
  }
};

export const assessProfile = async (
  category: CategoryId,
  answers: Record<string, string>,
  tier: string
): Promise<{ schools: string[]; comment: string }> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("API Key not found. Using mock data.");
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
    return getMockData(category, tier);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    let promptInstruction = "";
    if (category === 'undergrad') {
      promptInstruction = "Category: Japanese Undergraduate (Gakubu). Focus: EJU score importance, TOEFL, Statement of Purpose, Interview. DO NOT mention 'Research Proposal' as it is not required for undergrads.";
    } else if (category === 'grad') {
      promptInstruction = "Category: Japanese Graduate School (Master's). Focus: Research Proposal (Kenkyu Keikaku), contacting professors (Taoci), GPA, University background.";
    } else {
      promptInstruction = "Category: Art School (BFA/MFA). Focus: Portfolio quality, practical skills exam, interview.";
    }

    const prompt = `
      Role: Expert Japanese Study Abroad Consultant.
      Student Profile: ${JSON.stringify(answers)}.
      ${promptInstruction}
      System Calculated Tier: ${tier}.
      
      Task:
      1. Recommend 3-5 specific Japanese universities suitable for this profile.
      2. Write a professional, encouraging, yet objective comment (approx 150 words in Chinese) analyzing their strengths and weaknesses.
    `;

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        schools: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of 3-5 recommended university names in Chinese/Japanese characters."
        },
        comment: {
          type: Type.STRING,
          description: "A comprehensive advice paragraph in Chinese."
        }
      },
      required: ["schools", "comment"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");

    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback to mock data on error to prevent app crash
    return getMockData(category, tier);
  }
};
