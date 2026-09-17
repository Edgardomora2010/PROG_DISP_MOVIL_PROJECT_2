/* Estructura mínima para manejo de los usuarios */
export interface Users {
  id: number;
  username: string;
  password: string;
  status: boolean;
  created_at: Date;
}
