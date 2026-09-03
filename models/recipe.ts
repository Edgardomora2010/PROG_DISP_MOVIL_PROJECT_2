/* Modelo mínimo para recetas */

export interface Recipe {
  id: number;
  title: string;
  place: string | null;
  period: string | null;
  history: string | null;
  body: string;
}
