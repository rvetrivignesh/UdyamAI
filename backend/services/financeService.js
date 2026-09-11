const { routeScheme } = require('../utils/schemeRouter');
const { calculateEmi, generateQuarterlySchedule } = require('../utils/emiCalculator');

/**
 * Perform complete financial calculations for a given margin capital.
 * @param {number} marginCapital 
 */
function processFinancialCalculation(marginCapital) {
  const routed = routeScheme(marginCapital);

  if (!routed.isSupported) {
    return {
      isSupported: false,
      marginCapital: routed.marginCapital,
      projectCost: routed.projectCost,
      loanAmount: 0,
      scheme: null,
      emi: null,
      repaymentSchedule: [],
      message: routed.message,
      moratoriumNote: null
    };
  }

  const { scheme, loanAmount, projectCost } = routed;

  const emi = calculateEmi(loanAmount, scheme.interestRate, scheme.tenureYears);
  const repaymentSchedule = generateQuarterlySchedule(loanAmount, scheme.interestRate, scheme.tenureYears);

  const moratoriumNote = `${scheme.moratoriumMonths} months moratorium available. Note: Final interest treatment during moratorium depends on lending-agency terms.`;

  return {
    isSupported: true,
    marginCapital,
    projectCost,
    loanAmount,
    scheme,
    emi,
    repaymentSchedule,
    moratoriumNote,
    message: null
  };
}

module.exports = { processFinancialCalculation };
