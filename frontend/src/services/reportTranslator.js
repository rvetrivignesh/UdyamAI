/**
 * Client-Side AI Report Translator
 * Translates cached AI report content dynamically without triggering redundant LLM API calls.
 */

const DICTIONARY = {
  hi: {
    // Suitability Ratings
    'Suitable': 'उपयुक्त (Suitable)',
    'Moderately Suitable': 'मध्यम उपयुक्त (Moderately Suitable)',
    'Needs Caution': 'सावधानी आवश्यक (Needs Caution)',

    // Impact Levels
    'High': 'उच्च (High)',
    'Medium': 'मध्यम (Medium)',
    'Low': 'कम (Low)',

    // Competition Levels
    'Low Competition': 'कम प्रतिस्पर्धा',
    'Medium Competition': 'मध्यम प्रतिस्पर्धा',
    'High Competition': 'उच्च प्रतिस्पर्धा',

    // Common Action Items / Checklist
    'Verify local customer demand in 5-10 km radius.': '5-10 किमी के दायरे में स्थानीय ग्राहक मांग की पुष्टि करें।',
    'Confirm raw material and supplier prices.': 'कच्चे माल और आपूर्तिकर्ता की कीमतों की पुष्टि करें।',
    'Maintain sufficient working capital emergency reserve.': 'पर्याप्त कार्यशील पूंजी आपातकालीन रिजर्व बनाए रखें।',
    'Confirm final loan terms with lending agency.': 'ऋण एजेंसी के साथ ऋण की अंतिम शर्तों की पुष्टि करें।',
    'Ensure proper storage and transport facilities.': 'उचित भंडारण और परिवहन व्यवस्था सुनिश्चित करें।',
    'Register with Udyam Portal for MSME subsidy benefits.': 'एमएसएमई सब्सिडी लाभ के लिए उद्यम पोर्टल पर पंजीकरण करें।',

    // Cost Categories
    'Raw materials': 'कच्चा माल',
    'Packaging': 'पैकेजिंग व लेबलिंग',
    'Labor / Wages': 'श्रम / मजदूरी',
    'Utilities (Electricity/Water)': 'उपयोगिताएं (बिजली / पानी)',
    'Transport / Logistics': 'परिवहन व वितरण',
    'Rent / Lease': 'किराया व रख-रखाव',
    'Marketing': 'विपणन व प्रचार',
    'Miscellaneous': 'विविध खर्च'
  },
  te: {
    // Suitability Ratings
    'Suitable': 'అనుకూలమైనది (Suitable)',
    'Moderately Suitable': 'మధ్యస్థ అనుకూలమైనది (Moderately Suitable)',
    'Needs Caution': 'జాగ్రత్త అవసరం (Needs Caution)',

    // Impact Levels
    'High': 'అధిక (High)',
    'Medium': 'మధ్యస్థ (Medium)',
    'Low': 'తక్కువ (Low)',

    // Competition Levels
    'Low Competition': 'తక్కువ పోటీ',
    'Medium Competition': 'మధ్యస్థ పోటీ',
    'High Competition': 'అధిక పోటీ',

    // Common Action Items / Checklist
    'Verify local customer demand in 5-10 km radius.': '5-10 కిమీ పరిధిలో స్థానిక వినియోగదారుల డిమాండ్‌ను ధృవీకరించుకోండి.',
    'Confirm raw material and supplier prices.': 'ముడి పదార్థాల మరియు సరఫరాదారుల ధరలను ధృవీకరించండి.',
    'Maintain sufficient working capital emergency reserve.': 'తగినంత వర్కింగ్ క్యాపిటల్ అత్యవసర నిధిని నిర్వహించండి.',
    'Confirm final loan terms with lending agency.': 'రుణ సంస్థతో తుది రుణ నిబంధనలను నిర్ధారించండి.',
    'Ensure proper storage and transport facilities.': 'సరైన నిల్వ మరియు రవాణా సౌకర్యాలను నిర్ధారించుకోండి.',
    'Register with Udyam Portal for MSME subsidy benefits.': 'MSME సబ్సిడీ ప్రయోజనాల కోసం ఉద్యమ్ పోర్టల్‌లో నమోదు చేసుకోండి.',

    // Cost Categories
    'Raw materials': 'ముడి సరుకులు',
    'Packaging': 'ప్యాకేజింగ్ & లేబులింగ్',
    'Labor / Wages': 'శ్రామికులు / వేతనాలు',
    'Utilities (Electricity/Water)': 'విద్యుత్ / నీటి ఖర్చులు',
    'Transport / Logistics': 'రవాణా & పంపిణీ',
    'Rent / Lease': 'అద్దె & నిర్వహణ',
    'Marketing': 'మార్కెటింగ్ & ప్రచారం',
    'Miscellaneous': 'ఇతర ఖర్చులు'
  }
};

/**
 * Translates a single text phrase if available in dictionary
 */
export function translatePhrase(text, lang = 'en') {
  if (!text || lang === 'en') return text;
  return DICTIONARY[lang]?.[text] || text;
}

/**
 * Returns a translated clone of the cached report for the selected language
 */
export function getLocalizedReport(report, lang = 'en') {
  if (!report) return null;
  if (lang === 'en') return report;

  const dict = DICTIONARY[lang] || {};

  return {
    ...report,
    suitabilityRating: dict[report.suitabilityRating] || report.suitabilityRating,
    actionItems: (report.actionItems || []).map((item) => dict[item] || item),
    operationalCosts: (report.operationalCosts || []).map((cost) => ({
      ...cost,
      category: dict[cost.category] || cost.category
    })),
    workingCapital: {
      ...report.workingCapital,
      breakdown: (report.workingCapital?.breakdown || []).map((b) => ({
        ...b,
        item: dict[b.item] || b.item
      }))
    }
  };
}
