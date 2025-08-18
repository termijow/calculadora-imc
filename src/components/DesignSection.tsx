'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { FaWhatsappSquare } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
import ActionButton from './ui/ActionButton';

export default function DesignSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0.2, 0.8], [1, 1.2]);

  return (
    <section ref={targetRef} className="bg-brand-light-gray relative">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-stretch">
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky top-0 h-[70vh] lg:h-screen flex items-center justify-center overflow-hidden">
              <motion.div className="relative w-[80%] h-[80%]" style={{ scale }}>
                <Image
                  src="/backgrounds/DesignSection.png"
                  alt="Diseño de Manual de Marca para empresas de ingeniería"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1023px) 80vw, 40vw"
                />
              </motion.div>
            </div>
          </div>
          <div className="relative z-10 w-full lg:w-1/2 flex items-center py-20 lg:py-40 px-6 sm:px-12 lg:px-16">
            <div className="max-w-xl text-left w-full">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl leading-tight mb-8">
                <span className="font-gotham800 text-brand-pink">DISEÑO, </span>
                <span className="font-gotham600 text-brand-dark-text">LA IMAGEN QUE DEFINE TU EMPRESA</span>
              </h2>
              <p className="font-gotham400 text-lg text-gray-700 mb-8 leading-relaxed">
                {/* ... Texto de la sección ... */}
                Con nuestro Manual de Marca, te ayudamos a construir una imagen profesional, coherente y alineada con tus objetivos, generando confianza y diferenciación en el mercado. Ideal para empresas técnicas, startups o negocios en crecimiento que necesitan fortalecer su presencia visual y posicionarse con claridad.
              </p>
              <ul className="space-y-4 mb-10 text-lg text-gray-800 font-gotham400 list-none">
                {/* ... Items de la lista ... */}
                <li className="flex items-center"><span className="text-brand-green mr-3 text-2xl">✅</span> Proyecta una imagen unificada y profesional</li>
                <li className="flex items-center"><span className="text-brand-green mr-3 text-2xl">✅</span> Ahorra tiempo con elementos listos para usar</li>
                <li className="flex items-center"><span className="text-brand-green mr-3 text-2xl">✅</span> Destaca frente a la competencia con una identidad única</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                {/* Usamos la variante para fondo claro */}
                <ActionButton 
                  href="https://api.whatsapp.com/send/?phone=573126663512" 
                  text="CONTÁCTANOS" 
                  icon={<FaWhatsappSquare size={24} />} 
                  variant="primary"
                  isExternal={true}
                />
                <ActionButton href="/diseno" text="SABER MÁS" variant="secondary-light" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}