'use client';

import Link from 'next/link';
import React from 'react';

// Definimos los posibles estilos que nuestro botón puede tener
type ButtonVariant = 'primary' | 'secondary-dark' | 'secondary-light';

interface ActionButtonProps {
  href: string;
  text: string;
  icon?: React.ReactNode;
  variant?: ButtonVariant; // Usamos nuestro nuevo tipo
  isExternal?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  href,
  text,
  icon,
  variant = 'primary', // 'primary' es el valor por defecto
  isExternal = false,
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-lg font-gotham600 text-lg transition-all duration-300 transform hover:scale-105";

  // Objeto que mapea cada variante a sus clases de Tailwind
  const variantStyles = {
    primary: "bg-brand-pink hover:bg-pink-700 text-white shadow-lg",
    'secondary-dark': "bg-transparent border-2 border-white hover:bg-white hover:text-brand-dark-blue text-white", // Para fondos OSCUROS
    'secondary-light': "bg-transparent border-2 border-brand-dark-text hover:bg-brand-dark-text hover:text-white text-brand-dark-text", // Para fondos CLAROS
  };

  return (
    <Link
      href={href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      // Aplicamos los estilos correspondientes a la variante seleccionada
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      <span className="flex-shrink-0 mr-2">{icon}</span>
      <span>{text}</span>
    </Link>
  );
};

export default ActionButton;