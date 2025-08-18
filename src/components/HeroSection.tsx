// src/components/HeroSection.tsx
'use client';

import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-brand-dark-blue min-h-screen flex items-center pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Columna de Texto (Izquierda) */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl leading-tight">
              <span className="block font-gotham800 text-brand-pink">
                Desarrollo de software a la medida
              </span>
              <span className="block font-gotham600 text-white text-3xl md:text-4xl mt-2">
                con más de 5 años de experiencia en
              </span>
            </h1>
            <div className="text-2xl md:text-3xl lg:text-4xl font-gotham800 text-brand-green mt-4 h-24">
              <TypeAnimation
                sequence={[
                  'BOGOTÁ', 2000,
                  'MEDELLÍN', 2000,
                  'BARRANCABERMEJA', 2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </div>
            
            <p className="mt-12 text-2xl md:text-3xl font-gotham600 leading-normal">
              <span className="text-brand-pink">¿TU EMPRESA </span> 
              <span className="text-white">DE INGENIERÍA ES COMPETITIVA EN LA ERA </span> 
              <span className="text-brand-green">DIGITAL?</span>
            </p>
          </div>

          {/* Columna de Imagen (Derecha) */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
              <Image 
                src="/images/HeroImage.png" // ¡RECUERDA REEMPLAZAR ESTA IMAGEN!
                alt="Software a la medida para ingeniería"
                fill
                className="object-contain" // Usa 'object-cover' si quieres que la imagen llene el contenedor
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}