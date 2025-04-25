import React from 'react';

interface NumberButtonProps {
  number: string;
  selected?: boolean;
  onClick: (number: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const NumberButton: React.FC<NumberButtonProps> = ({
  number,
  selected = false,
  onClick,
  size = 'md',
  className = '',
}) => {
  const baseStyles = 'rounded-full transition-all duration-200 font-bold flex items-center justify-center';
  
  const sizeStyles = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };
  
  const selectedStyles = selected
    ? 'bg-amber-500 text-white shadow-md scale-110 border-2 border-amber-400'
    : 'bg-white text-slate-800 border-2 border-slate-200 hover:border-amber-400 hover:scale-105';

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${selectedStyles}
        ${className}
      `}
      onClick={() => onClick(number)}
      type="button"
      aria-pressed={selected}
    >
      {number}
    </button>
  );
};

export default NumberButton;