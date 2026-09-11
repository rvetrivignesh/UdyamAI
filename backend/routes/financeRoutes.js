const express = require('express');
const { z } = require('zod');
const { processFinancialCalculation } = require('../services/financeService');

const router = express.Router();

const calculateSchema = z.object({
  marginCapital: z.number({
    required_error: "marginCapital is required",
    invalid_type_error: "marginCapital must be a number"
  }).positive("marginCapital must be a positive number")
});

router.post('/calculate', (req, res) => {
  try {
    const parseResult = calculateSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        error: "Validation Error",
        details: parseResult.error.flatten().fieldErrors
      });
    }

    const { marginCapital } = parseResult.data;
    const result = processFinancialCalculation(marginCapital);

    return res.json(result);
  } catch (err) {
    console.error("Error calculating finance:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
