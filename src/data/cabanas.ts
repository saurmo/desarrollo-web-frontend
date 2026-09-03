import { Cabana } from "@/src/models/Cabana";

export const cabanas: Cabana[] = [
  {
    id: 1,
    nombre: "Cabaña El Paraíso",
    ubicacion: "Santa Elena, Medellín",
    precio: 350000,
    capacidad: 6,
    comodidades: [
      "Jacuzzi",
      "WiFi",
      "BBQ",
      "Chimenea",
    ],
    clima: "Frío",
    calificacion: 4.8,
    fotos: ["/cabanas/paraiso.jpg"],
    videos: [],
    categoria: "Romántica",
  },

  {
    id: 2,
    nombre: "Finca La Montaña",
    ubicacion: "Guatapé, Antioquia",
    precio: 480000,
    capacidad: 10,
    comodidades: [
      "Piscina",
      "BBQ",
      "WiFi",
      "Parqueadero",
    ],
    clima: "Templado",
    calificacion: 4.9,
    fotos: ["/cabanas/montana.jpg"],
    videos: [],
    categoria: "Familiar",
  },
];