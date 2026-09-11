import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import Input from '../components/Input';
import Button from '../components/Button';
import { ArrowLeft, ArrowRight, MapPin, IndianRupee, Store, Landmark } from 'lucide-react';

const CATEGORIES = [
  'Dairy',
  'Retail',
  'Textiles',
  'Food Processing',
  'Agriculture',
  'Manufacturing',
  'Services',
  'Other'
];

export default function BusinessInput() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [location, setLocation] = useState({
    village: '',
    block: '',
    district: ''
  });
  const [marginCapital, setMarginCapital] = useState('');
  const [category, setCategory] = useState('Dairy');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const marginNum = Number(marginCapital);
    if (!marginCapital || isNaN(marginNum) || marginNum <= 0) {
      newErrors.marginCapital = t('errorMarginRequired');
    }
    if (!category) {
      newErrors.category = t('errorCategoryRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/plan', {
        state: {
          location,
          marginCapital: Number(marginCapital),
          category
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-4xl mx-auto w-full">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-700 font-semibold hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('backButton')}</span>
        </button>

        <LanguageSelector />
      </header>

      {/* Main Form */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-8">
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-lg">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">
              {t('businessInfoTitle')}
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              {t('businessInfoSubtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Location Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-800 text-base md:text-lg">
                  {t('locationHeading')}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  id="village"
                  label={t('village')}
                  placeholder={t('villagePlaceholder')}
                  value={location.village}
                  onChange={(e) => setLocation({ ...location, village: e.target.value })}
                />

                <Input
                  id="block"
                  label={t('block')}
                  placeholder={t('blockPlaceholder')}
                  value={location.block}
                  onChange={(e) => setLocation({ ...location, block: e.target.value })}
                />

                <Input
                  id="district"
                  label={t('district')}
                  placeholder={t('districtPlaceholder')}
                  value={location.district}
                  onChange={(e) => setLocation({ ...location, district: e.target.value })}
                />
              </div>
            </div>

            {/* Business Category Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <Store className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-800 text-base md:text-lg">
                  {t('businessCategoryHeading')}
                </h3>
              </div>

              <div>
                <label className="block text-sm md:text-base font-semibold text-slate-800 mb-2">
                  {t('selectCategory')} <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {CATEGORIES.map((catKey) => {
                    const isSelected = category === catKey;
                    return (
                      <button
                        key={catKey}
                        type="button"
                        onClick={() => setCategory(catKey)}
                        className={`p-3.5 rounded-2xl border-2 text-center text-sm md:text-base font-bold transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm scale-[1.02]'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {t(`categories.${catKey}`)}
                      </button>
                    );
                  })}
                </div>
                {errors.category && (
                  <p className="text-sm font-medium text-red-600 mt-2">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Financial Input Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <IndianRupee className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-800 text-base md:text-lg">
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
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                fullWidth
                icon={ArrowRight}
                className="py-4 text-lg"
              >
                {t('calculateButton')}
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-500">
        <p>© 2026 UdyamAI — Rural Business AI Advisor</p>
      </footer>
    </div>
  );
}
