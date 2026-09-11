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
  className = ''
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm md:text-base font-semibold text-slate-800">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-sm">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 font-bold text-lg">
            {prefix}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full text-base md:text-lg rounded-xl border-2 py-3 px-4 transition-colors duration-150 focus:outline-none ${
            prefix ? 'pl-9' : ''
          } ${
            error
              ? 'border-red-400 bg-red-50/30 text-red-900 focus:border-red-600 focus:ring-2 focus:ring-red-200'
              : 'border-slate-300 bg-white text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
          }`}
        />
      </div>
      {error && <p className="text-sm font-medium text-red-600 animate-fade-in">{error}</p>}
      {helpText && !error && <p className="text-xs md:text-sm text-slate-500">{helpText}</p>}
    </div>
  );
}
