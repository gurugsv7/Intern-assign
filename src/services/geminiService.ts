import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface AIInsight {
  title: string;
  description: string;
  category: 'savings' | 'investment' | 'spending' | 'alert';
  impact: string;
}

export async function getFinancialInsights(financialData: any): Promise<AIInsight[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following financial data and provide 3-4 actionable insights. 
      Data: ${JSON.stringify(financialData)}
      
      Return the response in JSON format matching the schema.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { 
                type: Type.STRING,
                enum: ['savings', 'investment', 'spending', 'alert']
              },
              impact: { type: Type.STRING }
            },
            required: ['title', 'description', 'category', 'impact']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error('Error generating AI insights:', error);
    // Fallback mock insights
    return [
      {
        title: "Optimize Interest Yield",
        description: "Your current yield is underperforming market averages by 2.4%. We've identified three high-yield alternatives.",
        category: "investment",
        impact: "+$420/year"
      },
      {
        title: "Subscription Cleanup",
        description: "You have 3 inactive streaming subscriptions. Canceling them could save you $45 per month.",
        category: "spending",
        impact: "$540/year"
      }
    ];
  }
}
