// src/components/SpecializedServiceCard.tsx
import Image from 'next/image';

// Definimos los tipos de las props
interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
}

export default function SpecializedServiceCard({ imageUrl, title, description }: CardProps) {
  return (
    // --- CÓDIGO SIMPLIFICADO ---
    // Usamos nuestra clase reutilizable y añadimos la animación de elevación.
    <div className="glass-card-teal group flex flex-col h-full p-6 text-center hover:-translate-y-2">
      
      {/* Contenedor de la imagen */}
      <div className="relative w-full h-48 mb-4">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="contain"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Contenido de texto */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-gotham800 text-xl text-white mb-2">
          {title}
        </h3>
        <p className="font-gotham400 text-base text-white/80 flex-grow">
          {description}
        </p>
      </div>
    </div>
  );
}