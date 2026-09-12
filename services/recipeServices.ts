/* Importa el cliente de Axios para realizar solicitudes HTTP */
import { axiosClient } from "../lib/api/axios-client";
/* Importa tipo de estructura de los datos de una receta */
import { Recipe } from "../lib/api/types";

/* Nota: Se define un servicio de recetas que se encarga de obtener
 los datos de las recetas desde la API.

 Se utiliza el estilo de programación orientada a objetos visto en
 cursos anteriores de programación web para trabajar con APIs, ya que
 este servicio se individualizó únicamente para proporcionar comunicación
 y obtención de datos, con respecto a los estados, estilos y componentes
 que corresponden a la capa de React Native. */

/* Clase que representa el servicio de recetas */
export class RecipeService {
  /* Obtiene los datos de una solicitud realizada a la API */
  private async getData(): Promise<Recipe[]> {
    /* Realiza una solicitud GET a la ruta "/recipe" de la API
    incluye la totalidad de las recetas y sus detalles, y 
    devuelve los datos obtenidos */
    const { data } = await axiosClient.get<Recipe[]>("/recipe");
    return data;
  }

  /* Obtiene todas las recetas con todos sus datos */
  async getAllDataRecipes(): Promise<Recipe[]> {
    return this.getData();
  }

  /* Obtiene nombres de las recetas con la información necesaria para
     el catálogo */
  async getRecipes(): Promise<Pick<Recipe, "id" | "title">[]> {
    const data = await this.getData();

    return data.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
    }));
  }

  /* Obtiene una receta específica mediante su ID */
  async getRecipeById(id: number): Promise<Recipe> {
    const { data } = await axiosClient.get<Recipe[]>(
      /* Nomenclatura de supabase para filtrar por ID 
      a la hora de generar el path */
      `/recipe?id=eq.${id}`,
    );

    return data[0];
  }
}

/* Crea una instancia del servicio de recetas */
export const recipeService = new RecipeService();
