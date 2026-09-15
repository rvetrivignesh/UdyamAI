import React from 'react';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon: Icon,
  className = ''
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded transition-colors duration-150 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm uppercase tracking-wider select-none';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm md:text-base',
    lg: 'px-7 py-3.5 text-base md:text-lg'
  }[size] || 'px-5 py-2.5 text-sm md:text-base';

  const variants = {
    primary: 'bg-[#0b2545] hover:bg-[#134074] text-white border border-[#0b2545] focus:ring-blue-400',
    govGreen: 'bg-[#138808] hover:bg-[#0f6b06] text-white border border-[#138808] focus:ring-green-400',
    govAmber: 'bg-[#d97706] hover:bg-[#b45309] text-white border border-[#d97706] focus:ring-amber-400',
    secondary: 'bg-slate-800 hover:bg-slate-900 text-white border border-slate-800 focus:ring-slate-400',
    outline: 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-400 focus:ring-slate-300'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles} ${variants[variant] || variants.primary} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 mr-2 shrink-0" />}
      <span>{children}</span>
    </button>
  );
}
