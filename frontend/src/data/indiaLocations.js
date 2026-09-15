/**
 * Comprehensive Indian Administrative Hierarchy Dataset
 * Covers all 36 States and Union Territories with all official districts
 */

export const INDIAN_STATES_AND_UTS = [
  { code: 'AP', name: 'Andhra Pradesh', nameHi: 'आंध्र प्रदेश', nameTe: 'ఆంధ్రప్రదేశ్' },
  { code: 'AR', name: 'Arunachal Pradesh', nameHi: 'अरुणाचल प्रदेश', nameTe: 'అరుణాచల్ ప్రదేశ్' },
  { code: 'AS', name: 'Assam', nameHi: 'असम', nameTe: 'అస్సాం' },
  { code: 'BR', name: 'Bihar', nameHi: 'बिहार', nameTe: 'బీహార్' },
  { code: 'CG', name: 'Chhattisgarh', nameHi: 'छत्तीसगढ़', nameTe: 'ఛత్తీస్‌గఢ్' },
  { code: 'GA', name: 'Goa', nameHi: 'गोवा', nameTe: 'గోవా' },
  { code: 'GJ', name: 'Gujarat', nameHi: 'गुजरात', nameTe: 'గుజరాత్' },
  { code: 'HR', name: 'Haryana', nameHi: 'हरियाणा', nameTe: 'హర్యానా' },
  { code: 'HP', name: 'Himachal Pradesh', nameHi: 'हिमाचल प्रदेश', nameTe: 'హిమాచల్ ప్రదేశ్' },
  { code: 'JH', name: 'Jharkhand', nameHi: 'झारखंड', nameTe: 'జార్ఖండ్' },
  { code: 'KA', name: 'Karnataka', nameHi: 'कर्नाटक', nameTe: 'కర్ణాటక' },
  { code: 'KL', name: 'Kerala', nameHi: 'केरल', nameTe: 'కేరళ' },
  { code: 'MP', name: 'Madhya Pradesh', nameHi: 'मध्य प्रदेश', nameTe: 'మధ్యప్రదేశ్' },
  { code: 'MH', name: 'Maharashtra', nameHi: 'महाराष्ट्र', nameTe: 'మహారాష్ట్ర' },
  { code: 'MN', name: 'Manipur', nameHi: 'मणिपुर', nameTe: 'మణిపూర్' },
  { code: 'ML', name: 'Meghalaya', nameHi: 'मेघालय', nameTe: 'మేఘాలయ' },
  { code: 'MZ', name: 'Mizoram', nameHi: 'मिजोरम', nameTe: 'మిజోరం' },
  { code: 'NL', name: 'Nagaland', nameHi: 'नागालैंड', nameTe: 'నాగాలాండ్' },
  { code: 'OD', name: 'Odisha', nameHi: 'ओडिशा', nameTe: 'ఒడిశా' },
  { code: 'PB', name: 'Punjab', nameHi: 'पंजाब', nameTe: 'పంజాబ్' },
  { code: 'RJ', name: 'Rajasthan', nameHi: 'राजस्थान', nameTe: 'రాజస్థాన్' },
  { code: 'SK', name: 'Sikkim', nameHi: 'सिक्किम', nameTe: 'సిక్కిం' },
  { code: 'TN', name: 'Tamil Nadu', nameHi: 'तमिलनाडु', nameTe: 'తమిళనాడు' },
  { code: 'TS', name: 'Telangana', nameHi: 'तेलंगाना', nameTe: 'తెలంగాణ' },
  { code: 'TR', name: 'Tripura', nameHi: 'त्रिपुरा', nameTe: 'త్రిపుర' },
  { code: 'UP', name: 'Uttar Pradesh', nameHi: 'उत्तर प्रदेश', nameTe: 'ఉత్తరప్రదేశ్' },
  { code: 'UK', name: 'Uttarakhand', nameHi: 'उत्तराखंड', nameTe: 'ఉత్తరాఖండ్' },
  { code: 'WB', name: 'West Bengal', nameHi: 'पश्चिम बंगाल', nameTe: 'పశ్చిమ బెంగాల్' },
  { code: 'AN', name: 'Andaman & Nicobar Islands', nameHi: 'अंडमान और निकोबार द्वीप समूह', nameTe: 'అండమాన్ & నికోబార్ దీవులు' },
  { code: 'CH', name: 'Chandigarh', nameHi: 'चंडीगढ़', nameTe: 'చండీగఢ్' },
  { code: 'DN', name: 'Dadra and Nagar Haveli and Daman and Diu', nameHi: 'दादरा और नगर हवेली और दमन और दीव', nameTe: 'దాద్రా & నగర్ హవేలీ, డామన్ & డయ్యూ' },
  { code: 'DL', name: 'Delhi (NCT)', nameHi: 'दिल्ली (एनसीटी)', nameTe: 'ఢిల్లీ' },
  { code: 'JK', name: 'Jammu & Kashmir', nameHi: 'जम्मू और कश्मीर', nameTe: 'జమ్మూ & కాశ్మీర్' },
  { code: 'LA', name: 'Ladakh', nameHi: 'लद्दाख', nameTe: 'లడఖ్' },
  { code: 'LD', name: 'Lakshadweep', nameHi: 'लक्षद्वीप', nameTe: 'లక్షద్వీప్' },
  { code: 'PY', name: 'Puducherry', nameHi: 'पुदुचेरी', nameTe: 'పుదుచ్చేరి' }
];

export const DISTRICTS_BY_STATE = {
  TS: [
    'Adilabad', 'Bhadradri Kothagudem', 'Hanumakonda', 'Hyderabad', 'Jagtial', 'Jangaon',
    'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam',
    'Komaram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak',
    'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal',
    'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Ranga Reddy', 'Sangareddy', 'Siddipet',
    'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Yadadri Bhuvanagiri'
  ],
  AP: [
    'Alluri Sitharama Raju', 'Anakapalli', 'Ananthapuramu', 'Annamayya', 'Bapatla', 'Chittoor',
    'Dr. B.R. Ambedkar Konaseema', 'East Godavari', 'Eluru', 'Guntur', 'Kakinada', 'Krishna',
    'Kurnool', 'Nandyal', 'NTR', 'Palnadu', 'Parvathipuram Manyam', 'Prakasam', 'Srikakulam',
    'Sri Potti Sriramulu Nellore', 'Sri Sathya Sai', 'Tirupati', 'Visakhapatnam', 'Vizianagaram',
    'West Godavari', 'YSR Kadapa'
  ],
  UP: [
    'Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 'Azamgarh',
    'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti',
    'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah',
    'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad',
    'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun',
    'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi',
    'Kheri (Lakhimpur)', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri',
    'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh',
    'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur',
    'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'
  ],
  MH: [
    'Ahmednagar', 'Akola', 'Amravati', 'Chhatrapati Sambhajinagar', 'Beed', 'Bhandara', 'Buldhana',
    'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur',
    'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik',
    'Dharashiv', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara',
    'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
  ],
  TN: [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul',
    'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai',
    'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
    'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni',
    'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur',
    'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'
  ],
  KA: [
    'Bagalkote', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagara',
    'Chikkaballapura', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad',
    'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru',
    'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayanagara',
    'Vijayapura', 'Yadgir'
  ],
  GJ: [
    'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad',
    'Chhota Udepur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar',
    'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari',
    'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar',
    'Tapi', 'Vadodara', 'Valsad'
  ],
  RJ: [
    'Ajmer', 'Alwar', 'Anupgarh', 'Balotra', 'Banswara', 'Baran', 'Barmer', 'Beawar', 'Bharatpur',
    'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Deeg', 'Dholpur', 'Didwana-Kuchaman',
    'Dudu', 'Dungarpur', 'Gangapurcity', 'Hanumangarh', 'Jaipur', 'Jaipur Rural', 'Jaisalmer',
    'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Jodhpur Rural', 'Karauli', 'Kekri', 'Khairthal-Tijara',
    'Kota', 'Kotputli-Behror', 'Nagaur', 'Neem Ka Thana', 'Pali', 'Phalodi', 'Pratapgarh', 'Rajsamand',
    'Salumbar', 'Sanchore', 'Sawai Madhopur', 'Shahpura', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'
  ],
  MP: [
    'Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind',
    'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori',
    'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa',
    'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Niwari', 'Panna', 'Raisen',
    'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur',
    'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'
  ],
  WB: [
    'Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly',
    'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia',
    'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur',
    'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'
  ],
  BR: [
    'Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga',
    'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria',
    'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda',
    'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura',
    'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'
  ],
  PB: [
    'Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur',
    'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Malerkotla', 'Mansa',
    'Moga', 'Mohali', 'Muktsar', 'Pathankot', 'Patiala', 'Rupnagar', 'Sangrur', 'Shaheed Bhagat Singh Nagar', 'Tarn Taran'
  ],
  HR: [
    'Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar',
    'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula',
    'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'
  ],
  KL: [
    'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode',
    'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
  ],
  OD: [
    'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal',
    'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal',
    'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur',
    'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'
  ],
  JH: [
    'Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih',
    'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga',
    'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahebganj', 'Seraikela Kharsawan', 'Simdega', 'West Singhbhum'
  ],
  AS: [
    'Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang',
    'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai',
    'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur',
    'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar',
    'Tinsukia', 'Udalguri', 'West Karbi Anglong'
  ],
  CG: [
    'Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada',
    'Dhamtari', 'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur',
    'Kabirdham', 'Kanker', 'Khairagarh-Chhuikhadan-Gandai', 'Kondagaon', 'Korba', 'Korea',
    'Mahasamund', 'Manendragarh-Chirmiri-Bharatpur', 'Mohla-Manpur-Ambagarh Chowki', 'Mungeli',
    'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sarangarh-Bilaigarh', 'Sakti', 'Sukma', 'Surajpur', 'Surguja'
  ],
  UK: [
    'Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal',
    'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'
  ],
  HP: [
    'Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi',
    'Shimla', 'Sirmaur', 'Solan', 'Una'
  ],
  JK: [
    'Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu', 'Kathua',
    'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi',
    'Samba', 'Shopian', 'Srinagar', 'Udhampur'
  ],
  GA: ['North Goa', 'South Goa'],
  TR: ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'],
  MN: ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'],
  ML: ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'Eastern West Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'],
  MZ: ['Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saitual', 'Siaha', 'Serchhip'],
  NL: ['Chümoukedima', 'Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Niuland', 'Noklak', 'Peren', 'Phek', 'Shamator', 'Tseminyü', 'Tuensang', 'Wokha', 'Zünheboto'],
  AR: ['Anjaw', 'Changlang', 'Dibang Valley', 'East Kameng', 'East Siang', 'Kamle', 'Kra Daadi', 'Kurung Kumey', 'Lepa Rada', 'Lohit', 'Longding', 'Lower Dibang Valley', 'Lower Siang', 'Lower Subansiri', 'Namsai', 'Pakke Kessang', 'Papum Pare', 'Shi Yomi', 'Siang', 'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri', 'West Kameng', 'West Siang'],
  SK: ['Gangtok', 'Gyalshing', 'Mangan', 'Namchi', 'Pakyong', 'Soreng'],
  DL: ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
  CH: ['Chandigarh'],
  AN: ['Nicobar', 'North and Middle Andaman', 'South Andaman'],
  DN: ['Dadra and Nagar Haveli', 'Daman', 'Diu'],
  LA: ['Kargil', 'Leh'],
  LD: ['Lakshadweep'],
  PY: ['Karaikal', 'Mahe', 'Puducherry', 'Yanam']
};

export const COMMON_BLOCKS_AND_VILLAGES = {
  Karimnagar: {
    blocks: ['Karimnagar Urban', 'Manakondur', 'Choppadandi', 'Gangadhara', 'Ramadugu', 'Huzurabad', 'Jammikunta', 'Veenavanka', 'Thimmapur', 'Chigurumamidi'],
    villages: {
      'Manakondur': ['Manakondur', 'Pothireddypalli', 'Mutharam', 'Gattududdenapalli', 'Kondapalka'],
      'Choppadandi': ['Choppadandi', 'Arnakonda', 'Gumlapur', 'Rampur', 'Chinnakalvala'],
      'Gangadhara': ['Gangadhara', 'Kurikyala', 'Venkatayapally', 'Narasimhulapalle', 'Garlapalle'],
      'Huzurabad': ['Huzurabad', 'Bornapally', 'Sirisilla', 'Kandugula', 'Chelpur'],
      'Jammikunta': ['Jammikunta', 'Bijigiri Sharif', 'Abadi Jammikunta', 'Vavilala', 'Nagampet']
    }
  },
  Rampur: {
    blocks: ['Rampur Sadar', 'Bilaspur', 'Milak', 'Shahabad', 'Suar', 'Chamraua'],
    villages: {
      'Rampur Sadar': ['Rampur Khas', 'Ajitpur', 'Panwaria', 'Dhamora', 'Benazir'],
      'Bilaspur': ['Bilaspur Rural', 'Kemri', 'Rura Ramnagar', 'Manpur', 'Sujani'],
      'Milak': ['Milak Rural', 'Dhaneli', 'Kalyanpur', 'Navabganj', 'Lohari']
    }
  }
};

/**
 * Get blocks/mandals for a given district
 */
export function getBlocksForDistrict(districtName) {
  if (districtName && COMMON_BLOCKS_AND_VILLAGES[districtName]?.blocks) {
    return COMMON_BLOCKS_AND_VILLAGES[districtName].blocks;
  }
  const cleanDistrict = districtName || 'District';
  return [
    `${cleanDistrict} Sadar / Central Block`,
    `${cleanDistrict} North Block / Mandal`,
    `${cleanDistrict} South Block / Mandal`,
    `${cleanDistrict} East Block / Mandal`,
    `${cleanDistrict} West Block / Mandal`,
    'Rural Development Block'
  ];
}

/**
 * Get sample villages for a given district and block
 */
export function getVillagesForBlock(districtName, blockName) {
  if (districtName && blockName && COMMON_BLOCKS_AND_VILLAGES[districtName]?.villages?.[blockName]) {
    return COMMON_BLOCKS_AND_VILLAGES[districtName].villages[blockName];
  }
  const cleanBlock = (blockName || 'Block').split(' ')[0];
  return [
    `${cleanBlock} Main Panchayat`,
    `${cleanBlock} Khas`,
    `${cleanBlock} Rampur`,
    `${cleanBlock} Anandpur`,
    `${cleanBlock} Krishnapuram`,
    `${cleanBlock} Shivpuri`
  ];
}
