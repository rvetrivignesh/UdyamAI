/**
 * Calculate Monthly EMI and total costs
 * @param {number} loanAmount 
 * @param {number} annualInterestRate % per annum
 * @param {number} tenureYears 
 */
function calculateEmi(loanAmount, annualInterestRate, tenureYears) {
  if (!loanAmount || loanAmount <= 0) {
    return {
      monthlyEmi: 0,
      totalRepayment: 0,
      totalInterest: 0,
      tenureMonths: 0
    };
  }

  const r = annualInterestRate / (12 * 100);
  const n = tenureYears * 12;
  
  const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const monthlyEmi = Math.round(emi);
  const totalRepayment = Math.round(monthlyEmi * n);
  const totalInterest = Math.round(totalRepayment - loanAmount);

  return {
    monthlyEmi,
    totalRepayment,
    totalInterest,
    tenureMonths: n
  };
}

/**
 * Generate estimated quarterly repayment schedule
 * @param {number} loanAmount 
 * @param {number} annualInterestRate % per annum
 * @param {number} tenureYears 
 */
function generateQuarterlySchedule(loanAmount, annualInterestRate, tenureYears) {
  if (!loanAmount || loanAmount <= 0) return [];

  const totalQuarters = tenureYears * 4;
  const rq = annualInterestRate / (4 * 100);
  
  // Equal quarterly installment formula
  const rawQuarterlyPayment = (loanAmount * rq * Math.pow(1 + rq, totalQuarters)) / (Math.pow(1 + rq, totalQuarters) - 1);
  let quarterlyPayment = Math.round(rawQuarterlyPayment);

  let openingBalance = loanAmount;
  const schedule = [];

  for (let q = 1; q <= totalQuarters; q++) {
    const interest = Math.round(openingBalance * rq);
    let principal = quarterlyPayment - interest;

    if (q === totalQuarters || openingBalance - principal < 0) {
      principal = openingBalance;
      quarterlyPayment = principal + interest;
    }

    const closingBalance = Math.max(0, openingBalance - principal);

    schedule.push({
      quarter: q,
      openingBalance: Math.round(openingBalance),
      principal: Math.round(principal),
      interest: Math.round(interest),
      payment: Math.round(quarterlyPayment),
      closingBalance: Math.round(closingBalance)
    });

    openingBalance = closingBalance;
  }

  return schedule;
}

module.exports = {
  calculateEmi,
  generateQuarterlySchedule
};
