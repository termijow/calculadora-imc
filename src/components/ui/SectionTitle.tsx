// src/components/ui/SectionTitle.tsx
'use client';

import { motion } from 'framer-motion';

// Definimos las props que aceptará nuestro título
interface SectionTitleProps {
  pinkText?: string;
  whiteText?: string;
  greenText?: string;
  className?: string; // Para personalización extra como la alineación
}

// Variantes de animación para cada parte del título
const spanVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SectionTitle: React.FC<SectionTitleProps> = ({
  pinkText,
  whiteText,
  greenText,
  className = '', // Valor por defecto
}) => {
  return (
    <motion.h2
      className={`text-3xl lg:text-4xl xl:text-5xl leading-tight ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.2 }} // Anima cada span con un pequeño retraso
    >
      {pinkText && (
        <motion.span variants={spanVariants} className="font-gotham800 text-brand-pink">
          {pinkText}{' '}
        </motion.span>
      )}
      {whiteText && (
        <motion.span variants={spanVariants} className="font-gotham600 text-white">
          {whiteText}{' '}
        </motion.span>
      )}
      {greenText && (
        <motion.span variants={spanVariants} className="font-gotham800 text-brand-green">
          {greenText}
        </motion.span>
      )}
    </motion.h2>
  );
};

export default SectionTitle;