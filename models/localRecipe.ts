/* Modelo mínimo para recetas */

/* Esta interfaz se utiliza como entidad mínima de datos para representar las
recetas de tipo local, ya que, aunque se definió un archivo types.ts en lib/api
que maneja una estructura de datos para las recetas del API, las recetas del API
tienen más campos obligatorios debido a que las recetas medievales incluyen
información histórica y de lugares como un plus adicional.

Este modelo se centra en los datos mínimos necesarios para las recetas locales,
de forma que la aplicación pueda utilizar una u otra definición para acoplar
los datos según se carguen desde el API o desde la base de datos local. */

export interface LocalRecipe {
  id: number;
  title: string;
  title_en?: string | null;
  ingredients: string;
  preparation: string;
  recipe_context: "medieval" | "modern" | null;
}
