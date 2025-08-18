'use client';

import { motion } from 'framer-motion';
import SpecializedServiceCard from './cards/ServiceCard';
// 1. Importamos el título reutilizable
import SectionTitle from './ui/SectionTitle';

const servicesData = [
  { imageUrl: '/services/2.png', title: 'Brochure Técnico Comercial', description: '¿Tienes una solución valiosa, pero no logra destacarse?' },
  { imageUrl: '/services/3.png', title: 'Ecommerce', description: '¿Respondes las mismas preguntas una y otra vez sobre tus productos?' },
  { imageUrl: '/services/4.png', title: 'Manual de marca', description: '¿Tu empresa tiene una imagen visual que no refleja su verdadero valor?' },
  { imageUrl: '/services/5.png', title: 'Plataforma de capacitación', description: '¿Tu equipo crece, pero no tienes cómo organizar su formación?' },
  { imageUrl: '/services/6.png', title: 'Sitio web corporativo', description: '¿Tu empresa aún no tiene una página web clara y funcional?' },
  { imageUrl: '/services/7.png', title: 'ERP / CMS / CMMS', description: '¿Tu empresa necesita orden, pero no sabes qué sistema usar?' },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function SpecializedServicesSection() {
  return (
    <section className="bg-gradient-to-b from-black via-brand-dark-blue to-black py-20">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          {/* 2. AQUÍ ESTÁ LA REUTILIZACIÓN: Limpio, simple y animado */}
          <SectionTitle 
            whiteText="CONOCE LOS" 
            greenText="SERVICIOS"
            className="mb-4"
          />
          <motion.p 
            className="text-2xl lg:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className="font-gotham600 text-white">ESPECIALIZADOS PARA </span>
            <span className="font-gotham800 text-white">EMPRESAS DE INGENIERÍA</span>
            <br className="hidden lg:block" />
            <span className="font-gotham600 text-white"> ¡EXPLORA </span>
            <span className="font-gotham800 text-brand-pink">TODAS LAS OPCIONES QUE TENEMOS PARA TI!</span>
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {servicesData.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <SpecializedServiceCard
                imageUrl={service.imageUrl}
                title={service.title}
                description={service.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}