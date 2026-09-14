/* Se utiliza este archivo para definir los tipos de datos
 que se utilizan en la aplicación. */

/* A su vez Recipe me resulta más conveniente y representativo,
 que el ejemplo con Post, ya que se trata de una receta y no de 
 operaciones HTTP(GET, POST, PUT, DELETE,  PATCH)  */

export interface Recipe {
  id: number;
  created_at: string;
  title: string;
  title_en: string;
  place: string;
  period: string;
  history: string;
  ingredients: string;
  preparation: string;
  source_name: string;
  source_author: string;
  source_reference: string;
  source_url: string;
  latitude: number | null;
  longitude: number | null;
  source_id: number | null;
  place_id: number | null;
  image_url: string | null;
  recipe_context: string;
}

/* Se define un tipo de datos genérico para representar el estado 
de una operación asíncrona, que puede ser de cualquier tipo T. 
 Contiene tres propiedades: data, loading y error. */
export interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/* Se define un tipo de datos para representar un lugar histórico */
export interface Place {
  id: number;
  created_at: string;
  name: string;
  description: string;
  historical_context: string;
  latitude: number | null;
  longitude: number | null;
  image_place_url: string | null;
}
