import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'bordered';
}

const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default' }) => {
  const baseStyles = 'rounded-xl';
  
  const variantStyles = {
    default: 'bg-white shadow-md',
    glass: 'bg-white/80 backdrop-blur-sm shadow-lg',
    bordered: 'bg-white border-2 border-slate-200',
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`px-5 py-4 border-b border-slate-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`px-5 py-4 border-t border-slate-200 ${className}`}>
      {children}
    </div>
  );
};

export default Card;