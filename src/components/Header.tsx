// src/components/Header.tsx
'use client'; // Necesario para usar hooks como useState

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'INICIO' },
  { href: '/desarrollo', label: 'DESARROLLO' },
  { href: '/diseno', label: 'DISEÑO' },
  { href: '/portafolio', label: 'PORTAFOLIO' },
  { href: 'https://api.whatsapp.com/send/?phone=573126663512', label: 'CONTACTO', isExternal: true },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lógica para el header que cambia de color con el scroll (la veremos después)

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-brand-dark/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image 
              src="/images/Logo-andromeda.svg"
              alt="Andrómeda Logo" 
              width={180} 
              height={42}
              priority 
            />
          </Link>
        </div>
        
        {/* Navegación para Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              target={link.isExternal ? '_blank' : '_self'}
              rel={link.isExternal ? 'noopener noreferrer' : ''}
              className="text-white font-gotham600 hover:text-brand-pink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Botón de Menú para Móvil */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            {/* Ícono de hamburguesa */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú desplegable para Móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-dark/95">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white block px-3 py-2 rounded-md text-base font-gotham600">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}