'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, MapPin, Users, Sun, Check, ChevronLeft, ChevronRight, Video } from 'lucide-react';
import { Cabin } from '../models/Cabin';

interface CabinCardProps {
  cabin: Cabin;
  onBook?: (id: string) => void;
}

export const CabinCard: React.FC<CabinCardProps> = ({ cabin, onBook }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % cabin.photos.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + cabin.photos.length) % cabin.photos.length);
  };

  return (
    <>
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Galería de Fotos / Media */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        <Image
          src={cabin.photos[currentImageIndex] || '/placeholder.jpg'}
          alt={cabin.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge de Categoría Principal */}
        {cabin.categories.length > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            {cabin.categories[0]}
          </span>
        )}

        {/* Indicador de Video disponible */}
        {cabin.videos && cabin.videos.length > 0 && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-xs font-medium text-gray-800 backdrop-blur-md">
            <Video className="h-3.5 w-3.5 text-red-500" />
            Video
          </span>
        )}

        {/* Navegación de Imágenes */}
        {cabin.photos.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-gray-800 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-gray-800 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            
            {/* Puntos de navegación */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {cabin.photos.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-5">
        {/* Encabezado: Ubicación y Calificación */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-emerald-600" />
            <span>{cabin.location}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-gray-700">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{cabin.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Título */}
        <h3 className="mt-2 text-lg font-bold text-gray-900 line-clamp-1">{cabin.name}</h3>

        {/* Info rápida: Capacidad y Clima */}
        <div className="mt-3 flex items-center gap-4 text-xs font-medium text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-gray-400" />
            <span>{cabin.capacity} huéspedes</span>
          </div>
          <div className="flex items-center gap-1">
            <Sun className="h-4 w-4 text-amber-500" />
            <span>{cabin.weather}</span>
          </div>
        </div>

        {/* Comodidades destacadas (primeras 3) */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {cabin.comodities.slice(0, 3).map((item, index) => (
            <span
              key={index}
              className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
            >
              {item}
            </span>
          ))}
          {cabin.comodities.length > 3 && (
            <span className="text-[11px] font-medium text-gray-400">
              +{cabin.comodities.length - 3} más
            </span>
          )}
        </div>


        {/* Separador flex-grow para empujar el footer hacia abajo */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            {/* Precio */}
            <div>
              <span className="text-xl font-extrabold text-gray-900">
                ${cabin.price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500"> / noche</span>
            </div>

            {/* Botón de Reserva */}
            <button
              onClick={() => onBook && onBook(cabin.id)}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 active:scale-95"
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};