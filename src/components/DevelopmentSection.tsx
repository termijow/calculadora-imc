'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { FaWhatsappSquare } from 'react-icons/fa';
import ActionButton from './ui/ActionButton';
import SectionTitle from './ui/SectionTitle';

export default function DevelopmentSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0.2, 0.8], [1, 1.2]);

  return (
    <section 
      ref={targetRef}
      className="bg-gradient-to-b from-brand-dark-blue to-black relative overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row-reverse items-stretch">
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky top-0 h-[60vh] lg:h-screen flex items-center justify-center overflow-hidden p-8 lg:p-12">
              <motion.div className="relative w-full h-[80%]" style={{ scale }}>
                <Image
                  src="/backgrounds/DevelopmentSection.png"
                  alt="Desarrollo de software a la medida"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1023px) 80vw, 40vw"
                />
              </motion.div>
            </div>
          </div>
          <div className="relative z-10 w-full lg:w-1/2 flex items-center py-20 lg:py-40 px-6 sm:px-12 lg:px-16">
            <div className="max-w-xl text-left w-full">
              <SectionTitle 
                pinkText="DESARROLLO,"
                whiteText="TRANSFORMAMOS TUS IDEAS EN"
                greenText="REALIDAD"
                className="text-left mb-8"
              />
              <motion.p className="font-gotham400 text-lg lg:text-xl text-white/80 mb-12 leading-relaxed">
                {/* ... Texto de la sección ... */}
                ¿Tu empresa de ingeniería necesita algo que ninguna plataforma estándar puede ofrecer? Cuando los procesos de tu operación son únicos, el desarrollo a medida es la mejor opción. Te ayudamos a construir una plataforma propia, hecha para ti, que se integra con lo que ya usas y crece sin límites. Ideal para empresas que necesitan alto control, automatización y soluciones que se adapten al negocio, y no al revés.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                {/* Usamos la variante para fondo oscuro */}
                <ActionButton href="/desarrollo" text="SABER MÁS" variant="secondary-dark" />
                <ActionButton 
                  href="https://api.whatsapp.com/send/?phone=573126663512" 
                  text="CONTÁCTANOS" 
                  icon={<FaWhatsappSquare size={24} />} 
                  variant="primary"
                  isExternal={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}