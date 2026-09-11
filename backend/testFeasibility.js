const { generateFeasibilityReport } = require('./services/groqService');
const { processFinancialCalculation } = require('./services/financeService');

async function testFeasibility() {
  console.log("=== Testing Groq AI Feasibility Service Integration (Phase 3) ===");
  
  const sampleInput = {
    village: "Rampur",
    block: "Anand",
    district: "Karimnagar",
    businessCategory: "Dairy",
    marginCapital: 100000,
    language: "en"
  };

  try {
    console.log("1. Running Financial Engine...");
    const financialPlan = processFinancialCalculation(sampleInput.marginCapital);

    console.log("2. Requesting AI Feasibility Report from Groq API...");
    const report = await generateFeasibilityReport({
      ...sampleInput,
      financialPlan
    });

    console.log("\n✅ AI Feasibility Report received & validated successfully!");
    console.log(`- Suitability Rating: ${report.suitabilityRating}`);
    console.log(`- Action Items Count: ${report.actionItems.length}`);
    console.log(`- Market Reach Summary: ${report.marketReach.summary}`);
    console.log(`- Competitor Level: ${report.competitorMapping.competitionLevel}`);
    console.log(`- Working Capital Estimate: ₹${report.workingCapital.estimate}`);
    console.log(`- Operational Costs Items: ${report.operationalCosts.length}`);

    console.log("\n🎉 ALL PHASE 3 FEASIBILITY INTEGRATION TESTS PASSED!");
  } catch (err) {
    console.error("\n❌ Feasibility Test Failed:", err);
    process.exit(1);
  }
}

testFeasibility();
