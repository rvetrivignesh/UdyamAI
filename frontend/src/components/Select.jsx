import React from 'react';

export default function Select({
  id,
  label,
  value,
  onChange,
  options = [],
  placeholder = '-- Select --',
  error,
  helpText,
  required = false,
  disabled = false,
  className = ''
}) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wide">
          {label} {required && <span className="text-red-600 font-bold">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full text-sm md:text-base rounded border bg-white py-2.5 px-3 transition-colors duration-150 focus:outline-none appearance-none cursor-pointer ${
            disabled ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' : ''
          } ${
            error
              ? 'border-red-500 bg-red-50/20 text-red-950 focus:border-red-600 focus:ring-1 focus:ring-red-500'
              : 'border-slate-400 text-slate-900 focus:border-[#0b2545] focus:ring-1 focus:ring-[#0b2545]'
          }`}
        >
          {placeholder && (
            <option value="" disabled={required && value !== ''}>
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const labelText = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {labelText}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="text-xs font-semibold text-red-600 animate-fade-in">{error}</p>}
      {helpText && !error && <p className="text-[11px] md:text-xs text-slate-500">{helpText}</p>}
    </div>
  );
}
