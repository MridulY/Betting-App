import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'solid' | 'outline' | 'ghost';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  variant = 'solid',
  className = '',
}) => {
  const baseStyles = 'rounded-lg font-medium transition-all duration-200 focus:outline-none';
  
  const colorStyles = {
    primary: {
      solid: 'bg-purple-900 text-white hover:bg-purple-800 active:bg-purple-950',
      outline: 'border-2 border-purple-900 text-purple-900 hover:bg-purple-100',
      ghost: 'text-purple-900 hover:bg-purple-100',
    },
    secondary: {
      solid: 'bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-800',
      outline: 'border-2 border-slate-700 text-slate-700 hover:bg-slate-100',
      ghost: 'text-slate-700 hover:bg-slate-100',
    },
    accent: {
      solid: 'bg-amber-500 text-white hover:bg-amber-400 active:bg-amber-600',
      outline: 'border-2 border-amber-500 text-amber-500 hover:bg-amber-100',
      ghost: 'text-amber-500 hover:bg-amber-100',
    },
    success: {
      solid: 'bg-green-600 text-white hover:bg-green-500 active:bg-green-700',
      outline: 'border-2 border-green-600 text-green-600 hover:bg-green-100',
      ghost: 'text-green-600 hover:bg-green-100',
    },
    warning: {
      solid: 'bg-amber-600 text-white hover:bg-amber-500 active:bg-amber-700',
      outline: 'border-2 border-amber-600 text-amber-600 hover:bg-amber-100',
      ghost: 'text-amber-600 hover:bg-amber-100',
    },
    error: {
      solid: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-700',
      outline: 'border-2 border-red-600 text-red-600 hover:bg-red-100',
      ghost: 'text-red-600 hover:bg-red-100',
    },
  };

  const sizeStyles = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2.5 px-5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${colorStyles[color][variant]}
        ${sizeStyles[size]}
        ${widthStyle}
        ${disabledStyle}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;