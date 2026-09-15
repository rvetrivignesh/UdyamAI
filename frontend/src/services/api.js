import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const SCHEMES = [
  {
    id: 'micro_finance',
    name: 'Micro Finance Scheme',
    minProjectCost: 0,
    maxProjectCost: 140000,
    interestRate: 6.5,
    tenureYears: 3,
    moratoriumMonths: 3,
    maximumLoan: 125000,
    description: 'Designed for small-scale micro enterprises requiring lower capital investment.'
  },
  {
    id: 'term_loan',
    name: 'Term Loan Scheme',
    minProjectCost: 140001,
    maxProjectCost: 5000000,
    interestRate: 8.0,
    tenureYears: 7,
    moratoriumMonths: 6,
    maximumLoan: 4500000,
    description: 'Ideal for medium to larger rural businesses requiring higher investment and longer repayment periods.'
  }
];

function calculateClientEmi(loanAmount, annualInterestRate, tenureYears) {
  if (!loanAmount || loanAmount <= 0) {
    return { monthlyEmi: 0, totalRepayment: 0, totalInterest: 0, tenureMonths: 0 };
  }
  const r = annualInterestRate / (12 * 100);
  const n = tenureYears * 12;
  const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const monthlyEmi = Math.round(emi);
  const totalRepayment = Math.round(monthlyEmi * n);
  const totalInterest = Math.round(totalRepayment - loanAmount);
  return { monthlyEmi, totalRepayment, totalInterest, tenureMonths: n };
}

function generateClientQuarterlySchedule(loanAmount, annualInterestRate, tenureYears) {
  if (!loanAmount || loanAmount <= 0) return [];
  const totalQuarters = tenureYears * 4;
  const rq = annualInterestRate / (4 * 100);
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

/**
 * Calculate financial plan for a given margin capital
 */
export const calculateFinance = async (marginCapital) => {
  try {
    const response = await api.post('/finance/calculate', { marginCapital: Number(marginCapital) });
    return response.data;
  } catch (err) {
    console.warn("Backend API not reachable, running client-side financial engine:", err.message);
    const margin = Number(marginCapital);
    const projectCost = margin * 10;
    const rawLoanAmount = projectCost * 0.90;

    if (projectCost > 5000000) {
      return {
        isSupported: false,
        marginCapital: margin,
        projectCost,
        loanAmount: 0,
        scheme: null,
        message: "Project cost exceeds ₹50,00,000 maximum limit for supported government schemes."
      };
    }

    const selectedScheme = SCHEMES.find(
      s => projectCost >= s.minProjectCost && projectCost <= s.maxProjectCost
    ) || SCHEMES[1];

    const loanAmount = Math.min(rawLoanAmount, selectedScheme.maximumLoan);
    const emi = calculateClientEmi(loanAmount, selectedScheme.interestRate, selectedScheme.tenureYears);
    const repaymentSchedule = generateClientQuarterlySchedule(loanAmount, selectedScheme.interestRate, selectedScheme.tenureYears);

    return {
      isSupported: true,
      marginCapital: margin,
      projectCost,
      loanAmount,
      scheme: selectedScheme,
      emi,
      repaymentSchedule,
      moratoriumNote: `${selectedScheme.moratoriumMonths} months moratorium available.`
    };
  }
};

/**
 * Generate AI Business Feasibility Report
 */
export const generateFeasibilityReport = async (payload) => {
  try {
    const response = await api.post('/feasibility/generate', payload);
    return response.data;
  } catch (err) {
    console.warn("Backend AI API not reachable, generating comprehensive local feasibility model:", err.message);
    const { village = 'Local Area', district = 'District', businessCategory = 'Enterprise', marginCapital = 100000 } = payload;
    const isHindi = payload.language === 'hi';
    const isTelugu = payload.language === 'te';

    return {
      feasibilityReport: {
        marketReach: {
          summary: isHindi
            ? `${village} और ${district} के 5-10 किमी के दायरे में मजबूत स्थानीय उपभोक्ता मांग और बढ़ती आवश्यकता।`
            : isTelugu
            ? `${village} మరియు ${district} పరిసరాల్లో 5-10 కిమీ పరిధిలో మంచి వినియోగదారుల డిమాండ్ మరియు స్థానిక అవసరాలు ఉన్నాయి.`
            : `High potential consumer demand and steady customer footprint across 5-10 km radius of ${village}, ${district}.`,
          consumerBase: isHindi
            ? `स्थानीय ग्रामीण परिवार, साप्ताहिक बाजार खरीदार, और निकटवर्ती अर्ध-शहरी ग्राहक।`
            : isTelugu
            ? `స్థానిక గ్రామీణ కుటుంబాలు, వారపు సంతల వ్యాపారులు మరియు సమీప సెమీ-అర్బన్ వినియోగదారులు.`
            : `Local rural households, weekly village market traders, small businesses, and nearby township consumers.`,
          distributionChannels: [
            isHindi ? 'प्रत्यक्ष ग्राहक बिक्री' : isTelugu ? 'ప్రత్యక్ష కస్టమర్ అమ్మకాలు' : 'Direct Consumer Sales',
            isHindi ? 'स्थानीय किराना व खुदरा नेटवर्क' : isTelugu ? 'స్థానిక కిరాణా మరియు రిటైల్ నెట్‌వర్క్' : 'Local Retail & Grocery Network',
            isHindi ? 'साप्ताहिक ग्रामीण हाट / मंडी' : isTelugu ? 'వారపు సంతలు / గ్రామీణ మార్కెట్' : 'Weekly Rural Haats / Mandis',
            isHindi ? 'थोक सप्लाई ऑर्डर' : isTelugu ? 'టోకు సరఫరా ఆర్డర్లు' : 'Wholesale Supply Contracts'
          ]
        },
        opportunityAnalysis: {
          summary: isHindi
            ? `स्थानीय स्तर पर गुणवत्ता और उचित मूल्य की मांग के कारण ${businessCategory} के विस्तार के बेहतरीन अवसर हैं।`
            : isTelugu
            ? `${businessCategory} రంగంలో నాణ్యత మరియు సహేతుకమైన ధరల కారణంగా విస్తరణకు విస్తృత అవకాశాలు ఉన్నాయి.`
            : `Strong untapped growth window for ${businessCategory} driven by localized supply gaps and consistent everyday consumption.`,
          opportunities: [
            isHindi ? 'स्थानीय स्तर पर ताजा व त्वरित आपूर्ति' : isTelugu ? 'స్థానికంగా నాణ్యమైన సరుకుల సత్వర సరఫరా' : 'Rapid local order fulfillment and freshness guarantee',
            isHindi ? 'सरकारी सब्सिडी व मुद्रा ऋण लाभ' : isTelugu ? 'ప్రభుత్వ సబ్సిడీ మరియు ముద్రా రుణ ప్రయోజనాలు' : 'Eligible for Government PMEGP credit-linked capital subsidies',
            isHindi ? 'निकटवर्ती गांवों में नेटवर्क विस्तार' : isTelugu ? 'సమీప గ్రామాల వ్యాపార విస్తరణ' : 'Scalable delivery footprint into adjoining villages & panchayats',
            isHindi ? 'डिजिटल यूपीआई आधारित सुगम भुगतान' : isTelugu ? 'డిజిటల్ UPI చెల్లింపులతో సులభతర వ్యాపారం' : 'Seamless cash-flow management with rural digital payments & UPI'
          ]
        },
        swot: {
          strengths: [
            isHindi ? 'कम परिचालन लागत और स्थानीय कच्चा माल' : isTelugu ? 'తక్కువ నిర్వహణ ఖర్చులు మరియు స్థానిక ముడి సరుకులు' : 'Low overhead costs and proximity to raw material supplies',
            isHindi ? 'समुदाय के साथ मजबूत संबंध व विश्वास' : isTelugu ? 'స్థానిక ప్రజలతో బలమైన సంబంధాలు మరియు నమ్మకం' : 'High trust and direct customer relationships in the community',
            isHindi ? 'लचीली कार्यप्रणाली और स्वयं की देखरेख' : isTelugu ? 'సొంత పర్యవేక్షణ మరియు వ్యాపార సౌలభ్యం' : 'Owner-operated vigilance and fast decision making'
          ],
          weaknesses: [
            isHindi ? 'मौसम के अनुसार मांग में हल्का उतार-चढ़ाव' : isTelugu ? 'సీజన్ల వారీగా డిమాండ్‌లో హెచ్చుతగ్గులు' : 'Seasonal consumption fluctuations during festive vs lean months',
            isHindi ? 'प्रारंभिक कार्यशील पूंजी की आवश्यकता' : isTelugu ? 'ప్రారంభ వర్కింగ్ క్యాపిటల్ నిర్వహణ అవసరం' : 'Working capital buffers needed for initial credit cycles'
          ],
          opportunities: [
            isHindi ? 'संस्थागत और थोक ग्राहकों को जोड़ना' : isTelugu ? 'సంస్థాగత మరియు హోల్‌సేల్ వ్యాపారులతో ఒప్పందాలు' : 'Wholesale bulk tie-ups with local institutions and catering units',
            isHindi ? 'पैकेजिंग और ब्रांडिंग में सुधार' : isTelugu ? 'ప్యాకేజింగ్ మరియు బ్రాండింగ్ మెరుగుదల' : 'Value addition through clean packaging and localized branding'
          ],
          threats: [
            isHindi ? 'कच्चे माल की कीमतों में अप्रत्याशित वृद्धि' : isTelugu ? 'ముడి సరుకుల ధరలలో ఆకస్మిక పెరుగుదల' : 'Periodic raw material price variations',
            isHindi ? 'निकटवर्ती शहरों से आने वाले ब्रांडेड उत्पाद' : isTelugu ? 'సమీప పట్టణాల నుండి వచ్చే పోటీ' : 'Competition from urban commercial brands'
          ]
        },
        threats: [
          {
            risk: isHindi ? 'कच्चे माल की मौसमी आपूर्ति में कमी' : isTelugu ? 'ముడి సరుకు సరఫరాలో సీజనల్ కొరత' : 'Seasonal raw material supply fluctuations',
            impact: 'Medium',
            mitigation: isHindi ? 'स्थानीय आपूर्तिकर्ताओं के साथ दीर्घकालिक अग्रिम अनुबंध करें।' : isTelugu ? 'స్థానిక సరఫరాదారులతో ముందుగానే ఒప్పందాలు చేసుకోండి.' : 'Maintain 15-day backup inventory and diversify supplier base.'
          },
          {
            risk: isHindi ? 'कार्यशील पूंजी में नकदी प्रवाह की रुकावट' : isTelugu ? 'నగదు ప్రవాహం మరియు వర్కింగ్ క్యాపిటల్ సమస్యలు' : 'Delayed receivable collections from local buyers',
            impact: 'Medium',
            mitigation: isHindi ? 'नकद और यूपीआई भुगतान को प्राथमिकता दें एवं न्यूनतम 2 माह का रिजर्व रखें।' : isTelugu ? 'నగదు / UPI చెల్లింపులకు ప్రాధాన్యత ఇవ్వండి, అత్యవసర నిధిని ఉంచండి.' : 'Offer modest cash discounts for immediate settlement and keep 2-month reserve.'
          }
        ],
        competitorMapping: {
          competitionLevel: 'Medium',
          summary: isHindi
            ? `${district} में मध्यम प्रतिस्पर्धा है, जहां बेहतर सेवा और उचित मूल्य से अग्रणी स्थिति बनाई जा सकती है।`
            : isTelugu
            ? `${district} ప్రాంతంలో మధ్యస్థ పోటీ ఉంది, నాణ్యమైన సేవలతో మంచి స్థానాన్ని సంపాదించవచ్చు.`
            : `Moderate competition in ${district} with fragmented unorganized players. Differentiation can be achieved through consistent quality, reliability, and local delivery.`
        },
        pricing: {
          recommendedPrice: `₹${Math.round(marginCapital * 0.0035 + 120)} - ₹${Math.round(marginCapital * 0.006 + 350)}`,
          priceRange: `Competitive Village Market Band`,
          reason: isHindi
            ? `स्थानीय क्रय शक्ति और उत्पादन लागत के आधार पर प्रतिस्पर्धी मूल्य निर्धारण।`
            : isTelugu
            ? `స్థానిక కొనుగోలు శక్తి మరియు ఉత్పత్తి వ్యయాల ఆధారంగా సిఫార్సు చేయబడిన సరసమైన ధర.`
            : `Balanced penetration pricing designed for fast market capture while preserving a sustainable 22-28% gross operating margin.`
        },
        operationalCosts: [
          { category: 'Raw materials', estimate: Math.round(marginCapital * 0.12), note: 'Primary inventory & supplies' },
          { category: 'Labor / Wages', estimate: Math.round(marginCapital * 0.06), note: 'Helper & operations wages' },
          { category: 'Utilities (Electricity/Water)', estimate: Math.round(marginCapital * 0.02), note: 'Power, fuel & water bills' },
          { category: 'Transport / Logistics', estimate: Math.round(marginCapital * 0.03), note: 'Local distribution logistics' }
        ],
        workingCapital: {
          estimate: Math.round(marginCapital * 0.25),
          breakdown: [
            { item: 'Inventory Buffer', note: '15-20 days running materials' },
            { item: 'Operating Liquidity', note: 'Emergency buffer for utility & fuel' }
          ]
        },
        suitabilityRating: 'Suitable',
        actionItems: [
          'Verify local customer demand in 5-10 km radius.',
          'Confirm raw material and supplier prices.',
          'Maintain sufficient working capital emergency reserve.',
          'Confirm final loan terms with lending agency.'
        ],
        recommendation: isHindi
          ? `आपके चुने गए स्थान (${village}, ${district}) और मार्जिन पूंजी (₹${marginCapital}) के आधार पर यह परियोजना वित्तीय दृष्टि से मजबूत और व्यवहार्य है। सरकारी योजना के तहत ऋण के लिए आवेदन करने की अनुशंसा की जाती है।`
          : isTelugu
          ? `మీరు ఎంచుకున్న ప్రాంతం (${village}, ${district}) మరియు మార్జిన్ మూలధనం (₹${marginCapital}) ఆధారంగా ఈ ప్రాజెక్ట్ ఆర్థికంగా లాభదాయకమైనది. ప్రభుత్వ రాయితీ పథకం కింద రుణానికి దరఖాస్తు చేసుకోవడం సిఫార్సు చేయబడింది.`
          : `Based on your chosen location (${village}, ${district}) and available margin capital (₹${marginCapital}), this enterprise shows solid economic viability and favorable debt servicing capacity under official MSME loan parameters.`
      }
    };
  }
};

/**
 * Format currency in Indian Rupees format (e.g., ₹1,00,000)
 */
export const formatINR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
