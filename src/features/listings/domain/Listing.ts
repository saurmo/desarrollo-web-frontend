// Interfaz para definir los tipos de datos de la cabaña
export interface Listing {
  id: string;
  name: string;
  location: string;
  price: number;
  capacity: number;
  comodities: string[];
  weather: string;
  rating: string;
  photos: string[];
  videos?: string[];
  categories: string[];
}