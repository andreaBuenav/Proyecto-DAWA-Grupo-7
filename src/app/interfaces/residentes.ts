export interface Vehiculo {
  placa: string;
  modelo: string;
  estado: boolean | string; // API = bit, UI = texto
}

export interface Residente {
  id: number;

  nombre?: string;
  cedula?: string;
  telefono?: string;
  estado?: boolean;

  usuario?: string;
  contraseña?: string;
  rol?: string;

  vehiculos?: Vehiculo[];

  transaccion?: string;
}
