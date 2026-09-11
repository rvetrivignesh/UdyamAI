const { processFinancialCalculation } = require('./services/financeService');

const testCases = [
  { margin: 10000, expectedProject: 100000, expectedLoan: 90000, expectedScheme: 'micro_finance', expectedSupported: true },
  { margin: 14000, expectedProject: 140000, expectedLoan: 125000, expectedScheme: 'micro_finance', expectedSupported: true },
  { margin: 20000, expectedProject: 200000, expectedLoan: 180000, expectedScheme: 'term_loan', expectedSupported: true },
  { margin: 100000, expectedProject: 1000000, expectedLoan: 900000, expectedScheme: 'term_loan', expectedSupported: true },
  { margin: 500000, expectedProject: 5000000, expectedLoan: 4500000, expectedScheme: 'term_loan', expectedSupported: true },
  { margin: 500001, expectedProject: 5000010, expectedSupported: false }
];

let failed = false;

console.log("=== Running Financial Engine Verification Tests ===");

testCases.forEach((tc, idx) => {
  const result = processFinancialCalculation(tc.margin);
  console.log(`\nTest #${idx + 1}: Margin = ₹${tc.margin.toLocaleString('en-IN')}`);
  
  if (result.isSupported !== tc.expectedSupported) {
    console.error(`  FAIL: Supported state expected ${tc.expectedSupported}, got ${result.isSupported}`);
    failed = true;
    return;
  }

  if (!tc.expectedSupported) {
    console.log(`  PASS: Flagged correctly as unsupported (${result.message})`);
    return;
  }

  if (result.projectCost !== tc.expectedProject) {
    console.error(`  FAIL: Project cost expected ₹${tc.expectedProject}, got ₹${result.projectCost}`);
    failed = true;
  } else {
    console.log(`  PASS: Project Cost = ₹${result.projectCost.toLocaleString('en-IN')}`);
  }

  if (result.loanAmount !== tc.expectedLoan) {
    console.error(`  FAIL: Loan amount expected ₹${tc.expectedLoan}, got ₹${result.loanAmount}`);
    failed = true;
  } else {
    console.log(`  PASS: Loan Amount = ₹${result.loanAmount.toLocaleString('en-IN')}`);
  }

  if (result.scheme.id !== tc.expectedScheme) {
    console.error(`  FAIL: Scheme expected ${tc.expectedScheme}, got ${result.scheme.id}`);
    failed = true;
  } else {
    console.log(`  PASS: Scheme = ${result.scheme.name}`);
  }

  console.log(`  PASS: Monthly EMI = ₹${result.emi.monthlyEmi.toLocaleString('en-IN')}`);
  console.log(`  PASS: Schedule generated with ${result.repaymentSchedule.length} quarters`);
});

if (failed) {
  console.error("\n❌ Financial test suite FAILED!");
  process.exit(1);
} else {
  console.log("\n✅ All financial test cases PASSED successfully!");
}
