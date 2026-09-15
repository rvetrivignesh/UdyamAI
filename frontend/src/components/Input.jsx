import React from 'react';

export default function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helpText,
  prefix,
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
      <div className="relative shadow-none">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-600 font-bold text-base">
            {prefix}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full text-sm md:text-base rounded border py-2.5 px-3 transition-colors duration-150 focus:outline-none ${
            prefix ? 'pl-8' : ''
          } ${
            disabled ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' : ''
          } ${
            error
              ? 'border-red-500 bg-red-50/20 text-red-950 focus:border-red-600 focus:ring-1 focus:ring-red-500'
              : 'border-slate-400 bg-white text-slate-900 focus:border-[#0b2545] focus:ring-1 focus:ring-[#0b2545]'
          }`}
        />
      </div>
      {error && <p className="text-xs font-semibold text-red-600 animate-fade-in">{error}</p>}
      {helpText && !error && <p className="text-[11px] md:text-xs text-slate-500">{helpText}</p>}
    </div>
  );
}
