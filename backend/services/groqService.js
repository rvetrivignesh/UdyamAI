const Groq = require('groq-sdk');
const { z } = require('zod');
require('dotenv').config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Zod Schema to validate AI Response
const feasibilityReportSchema = z.object({
  marketReach: z.object({
    summary: z.string(),
    consumerBase: z.string(),
    distributionChannels: z.array(z.string())
  }),
  opportunityAnalysis: z.object({
    summary: z.string(),
    opportunities: z.array(z.string())
  }),
  swot: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    opportunities: z.array(z.string()),
    threats: z.array(z.string())
  }),
  threats: z.array(
    z.object({
      risk: z.string(),
      impact: z.string(),
      mitigation: z.string()
    })
  ),
  competitorMapping: z.object({
    competitionLevel: z.string(),
    summary: z.string()
  }),
  pricing: z.object({
    priceRange: z.string(),
    recommendedPrice: z.string(),
    reason: z.string()
  }),
  operationalCosts: z.array(
    z.object({
      category: z.string(),
      estimate: z.number().optional().default(0),
      note: z.string()
    })
  ),
  workingCapital: z.object({
    estimate: z.number(),
    breakdown: z.array(
      z.object({
        item: z.string(),
        note: z.string()
      })
    )
  }),
  suitabilityRating: z.enum(['Suitable', 'Moderately Suitable', 'Needs Caution']).optional().default('Suitable'),
  actionItems: z.array(z.string()).optional().default([
    'Verify local customer demand in 5-10 km radius.',
    'Confirm raw material and supplier prices.',
    'Maintain sufficient working capital emergency reserve.',
    'Confirm final loan terms with lending agency.'
  ]),
  recommendation: z.string()
});

/**
 * Generate Hyper-Local Business Feasibility Report via Groq API
 */
async function generateFeasibilityReport({
  village,
  block,
  district,
  businessCategory,
  marginCapital,
  financialPlan,
  language = 'en'
}) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not configured in backend environment.');
  }

  const langNames = {
    en: 'English',
    hi: 'Hindi',
    te: 'Telugu'
  };
  const targetLanguage = langNames[language] || 'English';

  const systemPrompt = `You are a Rural Business Advisor in India. Return hyper-local feasibility analysis in ${targetLanguage} as JSON. Never guarantee profits or loan approval. Suitability rating must be "Suitable", "Moderately Suitable", or "Needs Caution".`;

  const userPrompt = `Location: ${village || 'Rampur'}, ${block || 'Anand'}, ${district || 'Karimnagar'}.
Business: ${businessCategory}. Margin: ₹${marginCapital}. Project Cost: ₹${financialPlan.projectCost}. Loan: ₹${financialPlan.loanAmount}.

Respond ONLY in valid JSON with schema:
{
  "marketReach": { "summary": "", "consumerBase": "", "distributionChannels": ["Direct sales", "Local retailers"] },
  "opportunityAnalysis": { "summary": "", "opportunities": [""] },
  "swot": { "strengths": [""], "weaknesses": [""], "opportunities": [""], "threats": [""] },
  "threats": [{ "risk": "", "impact": "Medium", "mitigation": "" }],
  "competitorMapping": { "competitionLevel": "Medium", "summary": "" },
  "pricing": { "priceRange": "", "recommendedPrice": "", "reason": "" },
  "operationalCosts": [{ "category": "Raw materials", "estimate": 15000, "note": "" }],
  "workingCapital": { "estimate": 25000, "breakdown": [{ "item": "Raw materials", "note": "" }] },
  "suitabilityRating": "Suitable",
  "actionItems": ["Verify demand", "Confirm prices", "Keep working capital reserve", "Confirm loan terms"],
  "recommendation": ""
}`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'groq/compound-mini',
      response_format: { type: 'json_object' },
      temperature: 0.3
    });

    const content = chatCompletion.choices[0]?.message?.content;

    if (!content) {
      throw new Error('Received empty response from Groq AI service.');
    }

    const parsedJson = JSON.parse(content);
    const validatedData = feasibilityReportSchema.parse(parsedJson);

    return validatedData;
  } catch (err) {
    console.error('Groq AI Service error:', err?.message || err);
    throw err;
  }
}

module.exports = { generateFeasibilityReport };
