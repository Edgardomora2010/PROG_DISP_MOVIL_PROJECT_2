/* Importa el cliente de Axios para realizar solicitudes HTTP */
import { axiosClient } from "../lib/api/axios-client";
/* Importa el tipo de estructura de los datos de un lugar */
import { Place } from "../lib/api/types";

/* Servicio encargado de obtener los lugares históricos que almacena
la API. 

/* Clase que representa el servicio de lugares */
export class PlaceService {
  /* Obtiene los datos de los lugares desde la API */
  private async getData(): Promise<Place[]> {
    /* Realiza una solicitud GET a la tabla "/places" de Supabase */
    const { data } = await axiosClient.get<Place[]>("/places");
    return data;
  }

  /* Obtiene todos los lugares con todos sus datos */
  async getAllDataPlaces(): Promise<Place[]> {
    return this.getData();
  }
}

/* Crea una instancia del servicio de lugares */
export const placeService = new PlaceService();
