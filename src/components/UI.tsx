import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  type?: 'button' | 'submit';
}

export function Button({ children, onClick, variant = 'primary', className = '', type = 'button' }: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-brand-accent text-white hover:bg-brand-accent/90 shadow-lg shadow-brand-accent/20",
    secondary: "bg-white text-brand-text hover:bg-gray-50 border border-gray-100 shadow-sm",
    outline: "bg-transparent border-2 border-brand-accent text-brand-accent hover:bg-brand-pink",
    ghost: "bg-transparent text-brand-text hover:bg-brand-pink"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-5xl text-brand-text mb-4 leading-tight">{title}</h2>
      {subtitle && <p className="text-brand-muted text-lg max-w-2xl mx-auto">{subtitle}</p>}
      <div className={`h-1 w-20 bg-brand-accent rounded-full mt-6 ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
}
