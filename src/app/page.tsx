// src/app/page.tsx
import DesignSection from '@/components/DesignSection';
import DevelopmentSection from '@/components/DevelopmentSection';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';

export default function Home() {
  return (
    <>
      <HeroSection/>
      <ServicesSection/>
      <DesignSection/>
      <ServicesSection/>
      <DevelopmentSection/>
      {/* Aquí irán los demás componentes que vayas creando */}
    </>
  );
}