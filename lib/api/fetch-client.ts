/* Cliente para realizar solicitudes HTTP */
const BASE_URL = "https://fiqnlopbjnvxejykfelx.supabase.co/rest/v1";

// Función genérica para realizar solicitudes HTTP utilizando fetch.
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  /* // Realiza la solicitud HTTP utilizando la ruta y las opciones indicadas. */
  const response = await fetch(`${BASE_URL}${path}`, {
    // Configura los encabezados de la solicitud HTTP.
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
      ...options.headers,
    },

    /* Agrega las opciones específicas de la solicitud, como el método y 
     el body. */
    ...options,
  });

  // Verifica si la respuesta HTTP fue exitosa.
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  // Convierte la respuesta de la API de JSON al tipo genérico indicado.
  return response.json() as Promise<T>;
}

/* Exporta un objeto con métodos para realizar solicitudes HTTP GET y POST. */
export const fetchClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
