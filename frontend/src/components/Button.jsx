import React from 'react';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  icon: Icon,
  className = ''
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] shadow-md';
  
  const sizeStyles = 'px-6 py-3.5 text-base md:text-lg';

  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-300 shadow-emerald-200',
    secondary: 'bg-slate-800 hover:bg-slate-900 text-white focus:ring-slate-300 shadow-slate-300',
    outline: 'bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 focus:ring-slate-200'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2 shrink-0" />}
      <span>{children}</span>
    </button>
  );
}
