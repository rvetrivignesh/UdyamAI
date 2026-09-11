const schemes = require('../data/schemes.json');

/**
 * Route margin capital to applicable scheme and calculate project cost & capped loan.
 * @param {number} marginCapital
 */
function routeScheme(marginCapital) {
  const projectCost = marginCapital * 10;
  const rawLoanAmount = projectCost * 0.90;

  if (projectCost > 5000000) {
    return {
      isSupported: false,
      marginCapital,
      projectCost,
      loanAmount: 0,
      scheme: null,
      message: "Project cost exceeds ₹50,00,000 maximum limit for supported government schemes."
    };
  }

  const selectedScheme = schemes.find(
    s => projectCost >= s.minProjectCost && projectCost <= s.maxProjectCost
  );

  if (!selectedScheme) {
    return {
      isSupported: false,
      marginCapital,
      projectCost,
      loanAmount: 0,
      scheme: null,
      message: "No eligible scheme found for the given project cost."
    };
  }

  const loanAmount = Math.min(rawLoanAmount, selectedScheme.maximumLoan);

  return {
    isSupported: true,
    marginCapital,
    projectCost,
    rawLoanAmount,
    loanAmount,
    scheme: selectedScheme,
    message: null
  };
}

module.exports = { routeScheme };
