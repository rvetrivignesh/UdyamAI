import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GovHeader from '../components/GovHeader';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import {
  INDIAN_STATES_AND_UTS,
  DISTRICTS_BY_STATE,
  getBlocksForDistrict,
  getVillagesForBlock
} from '../data/indiaLocations';
import {
  ArrowRight,
  MapPin,
  IndianRupee,
  Store,
  FileText,
  Info,
  Building
} from 'lucide-react';

const CATEGORY_KEYS = [
  'Dairy',
  'Retail',
  'Textiles',
  'Food Processing',
  'Agriculture',
  'Manufacturing',
  'Services',
  'Handicrafts',
  'Poultry',
  'Transport',
  'Herbal',
  'Other'
];

export default function BusinessInput() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  // Form State
  const [selectedState, setSelectedState] = useState('TS'); // Default Telangana
  const [district, setDistrict] = useState('Karimnagar');
  const [block, setBlock] = useState('Choppadandi');
  const [village, setVillage] = useState('Rampur');
  const [customVillage, setCustomVillage] = useState('');
  const [isOtherVillage, setIsOtherVillage] = useState(false);

  const [category, setCategory] = useState('Dairy');
  const [marginCapital, setMarginCapital] = useState('100000');
  const [errors, setErrors] = useState({});

  // District options derived from selectedState
  const availableDistricts = DISTRICTS_BY_STATE[selectedState] || [];

  // Block options derived from district
  const availableBlocks = getBlocksForDistrict(district);

  // Village options derived from district and block
  const availableVillages = getVillagesForBlock(district, block);

  // Handle State Change
  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
    const firstDistrict = (DISTRICTS_BY_STATE[stateCode] || [])[0] || '';
    setDistrict(firstDistrict);
    const firstBlock = getBlocksForDistrict(firstDistrict)[0] || '';
    setBlock(firstBlock);
    const firstVillage = getVillagesForBlock(firstDistrict, firstBlock)[0] || '';
    setVillage(firstVillage);
    setIsOtherVillage(false);
    setCustomVillage('');
  };

  // Handle District Change
  const handleDistrictChange = (e) => {
    const distName = e.target.value;
    setDistrict(distName);
    const firstBlock = getBlocksForDistrict(distName)[0] || '';
    setBlock(firstBlock);
    const firstVillage = getVillagesForBlock(distName, firstBlock)[0] || '';
    setVillage(firstVillage);
    setIsOtherVillage(false);
    setCustomVillage('');
  };

  // Handle Block Change
  const handleBlockChange = (e) => {
    const blkName = e.target.value;
    setBlock(blkName);
    const firstVillage = getVillagesForBlock(district, blkName)[0] || '';
    setVillage(firstVillage);
    setIsOtherVillage(false);
    setCustomVillage('');
  };

  // Handle Village Change
  const handleVillageChange = (e) => {
    const val = e.target.value;
    if (val === '__OTHER__') {
      setIsOtherVillage(true);
      setVillage('__OTHER__');
    } else {
      setIsOtherVillage(false);
      setVillage(val);
    }
  };

  // Format State Options with Localized Names
  const stateOptions = INDIAN_STATES_AND_UTS.map((s) => ({
    value: s.code,
    label: currentLang === 'hi' ? `${s.nameHi} (${s.name})` : currentLang === 'te' ? `${s.nameTe} (${s.name})` : s.name
  }));

  // Format Category Options with Localized Translations
  const categoryOptions = CATEGORY_KEYS.map((catKey) => ({
    value: catKey,
    label: t(`categories.${catKey}`)
  }));

  const validate = () => {
    const newErrors = {};
    if (!selectedState) {
      newErrors.state = t('errorStateRequired');
    }
    if (!district) {
      newErrors.district = t('errorDistrictRequired');
    }
    if (!category) {
      newErrors.category = t('errorCategoryRequired');
    }
    const marginNum = Number(marginCapital);
    if (!marginCapital || isNaN(marginNum) || marginNum <= 0) {
      newErrors.marginCapital = t('errorMarginRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const stateObj = INDIAN_STATES_AND_UTS.find((s) => s.code === selectedState);
      const stateName = stateObj ? stateObj.name : selectedState;
      const finalVillageName = isOtherVillage && customVillage.trim() ? customVillage.trim() : village;

      navigate('/plan', {
        state: {
          location: {
            stateCode: selectedState,
            stateName: stateName,
            district: district,
            block: block,
            village: finalVillageName
          },
          marginCapital: Number(marginCapital),
          category: category
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      {/* Official Government Header */}
      <GovHeader showBack />

      {/* Main Form Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 md:py-8">
        <div className="bg-white border-t-4 border-t-[#0b2545] border-x border-b border-slate-300 p-5 md:p-8 shadow-sm">
          {/* Form Header */}
          <div className="border-b border-slate-200 pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#0b2545] mb-1">
              <FileText className="w-4 h-4 text-[#ff9933]" />
              <span>Ministry of MSME / Udyam Enterprise Registration</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#0b2545] tracking-tight uppercase">
              {t('businessInfoTitle')}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1">
              {t('businessInfoSubtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Location Section (Select Boxes for All of India) */}
            <div className="bg-slate-50 border border-slate-300 p-4 md:p-6 rounded space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <MapPin className="w-5 h-5 text-[#0b2545]" />
                <h3 className="font-bold text-[#0b2545] text-sm md:text-base uppercase tracking-wide">
                  {t('locationHeading')}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* State / UT Select */}
                <Select
                  id="stateSelect"
                  label={t('state')}
                  required
                  value={selectedState}
                  onChange={handleStateChange}
                  options={stateOptions}
                  placeholder={t('selectState')}
                  error={errors.state}
                />

                {/* District Select */}
                <Select
                  id="districtSelect"
                  label={t('district')}
                  required
                  value={district}
                  onChange={handleDistrictChange}
                  options={availableDistricts}
                  placeholder={t('selectDistrict')}
                  disabled={!selectedState}
                  error={errors.district}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Block / Mandal Select */}
                <Select
                  id="blockSelect"
                  label={t('block')}
                  value={block}
                  onChange={handleBlockChange}
                  options={availableBlocks}
                  placeholder={t('selectBlock')}
                  disabled={!district}
                />

                {/* Village / Gram Panchayat Select */}
                <Select
                  id="villageSelect"
                  label={t('village')}
                  value={village}
                  onChange={handleVillageChange}
                  options={[
                    ...availableVillages.map((v) => ({ value: v, label: v })),
                    { value: '__OTHER__', label: `+ ${t('customVillage')}` }
                  ]}
                  placeholder={t('selectVillage')}
                  disabled={!block}
                />
              </div>

              {/* Custom Village Name Input when '+ Specify Other' is chosen */}
              {isOtherVillage && (
                <div className="pt-2 animate-fade-in">
                  <Input
                    id="customVillageInput"
                    label={t('customVillage')}
                    placeholder={t('customVillagePlaceholder')}
                    value={customVillage}
                    onChange={(e) => setCustomVillage(e.target.value)}
                    helpText="Enter the name of your specific village, hamlet, or ward."
                  />
                </div>
              )}
            </div>

            {/* 2. Business Category Section (Structured Select Box) */}
            <div className="bg-slate-50 border border-slate-300 p-4 md:p-6 rounded space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <Store className="w-5 h-5 text-[#0b2545]" />
                <h3 className="font-bold text-[#0b2545] text-sm md:text-base uppercase tracking-wide">
                  {t('businessCategoryHeading')}
                </h3>
              </div>

              <Select
                id="categorySelect"
                label={t('selectCategory')}
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={categoryOptions}
                placeholder={t('selectCategoryPlaceholder')}
                error={errors.category}
                helpText="Select the standard industrial/rural category that matches your planned business."
              />
            </div>

            {/* 3. Financial Margin Capital Input */}
            <div className="bg-slate-50 border border-slate-300 p-4 md:p-6 rounded space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <IndianRupee className="w-5 h-5 text-[#0b2545]" />
                <h3 className="font-bold text-[#0b2545] text-sm md:text-base uppercase tracking-wide">
                  {t('financialHeading')}
                </h3>
              </div>

              <Input
                id="marginCapital"
                label={t('marginCapital')}
                type="number"
                prefix="₹"
                required
                placeholder={t('marginCapitalPlaceholder')}
                value={marginCapital}
                onChange={(e) => setMarginCapital(e.target.value)}
                error={errors.marginCapital}
                helpText={t('marginHelpText')}
              />

              <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 p-3 rounded text-xs text-blue-900 font-medium">
                <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>
                  Under PMEGP & Government Subsidy guidelines, a margin contribution of 10% unlocks up to 90% bank loan financing with credit-linked capital subsidies.
                </span>
              </div>
            </div>

            {/* Submit Button & Navigation */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto"
              >
                {t('backButton')}
              </Button>

              <Button
                type="submit"
                variant="govGreen"
                size="lg"
                icon={ArrowRight}
                className="w-full sm:w-auto shadow-md"
              >
                {t('calculateButton')}
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-300 py-4 px-4 text-center text-xs text-slate-500">
        <p>{t('footerCopyright')}</p>
      </footer>
    </div>
  );
}
