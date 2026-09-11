const express = require('express');
const { z } = require('zod');
const { processFinancialCalculation } = require('../services/financeService');
const { generateFeasibilityReport } = require('../services/groqService');

const router = express.Router();

const feasibilityInputSchema = z.object({
  village: z.string().optional().default(''),
  block: z.string().optional().default(''),
  district: z.string().optional().default(''),
  businessCategory: z.string({ required_error: "businessCategory is required" }),
  marginCapital: z.number({ required_error: "marginCapital is required" }).positive("marginCapital must be positive"),
  language: z.enum(['en', 'hi', 'te']).optional().default('en')
});

router.post('/generate', async (req, res) => {
  try {
    const parseResult = feasibilityInputSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        error: "Validation Error",
        details: parseResult.error.flatten().fieldErrors
      });
    }

    const { village, block, district, businessCategory, marginCapital, language } = parseResult.data;

    // 1. Deterministic Phase 1 Financial Engine Calculation
    const financialPlan = processFinancialCalculation(marginCapital);

    if (!financialPlan.isSupported) {
      return res.json({
        financialPlan,
        feasibilityReport: null,
        message: financialPlan.message
      });
    }

    // 2. Call Groq AI Service for Feasibility Report
    const feasibilityReport = await generateFeasibilityReport({
      village,
      block,
      district,
      businessCategory,
      marginCapital,
      financialPlan,
      language
    });

    return res.json({
      financialPlan,
      feasibilityReport
    });
  } catch (err) {
    console.error("Feasibility Generation Endpoint Error:", err.message);
    // User-friendly error per Section 17 without exposing raw error details
    return res.status(500).json({
      error: "We could not generate your business report right now. Please try again."
    });
  }
});

module.exports = router;
