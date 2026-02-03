export interface Guardia {
  id: number;
  nombres?: string;
  cedula?: string;
  telefono?: string;
  estado?: boolean;

  usuario?: string;
  contrasena?: string;
  rol?: string;

  transaccion?: string;
}
