// Interfaz para definir los tipos de datos de la cabaña
export interface Cabin {
  id: string;
  name: string;
  location: string;
  price: number;
  capacity: number;
  comodities: string[];
  weather: string;
  rating: number;
  photos: string[];
  videos?: string[];
  categories: string[];
}