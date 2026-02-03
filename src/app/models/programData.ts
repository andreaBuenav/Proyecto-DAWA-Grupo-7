export interface Visitante {
  id: number;
  id_residente?: number; 
  nombreCompleto: string;
  identificacion: string;
  placaVehiculo: string;
  fechaInicio: Date;
  fechaFin: Date;
}

export interface Vehiculo {
  placa: string;
  modelo: string;
  estado: string;
}

export interface Residente {
  id: number;
  nombre: string;
  cedula: string;
  telefono: string;
  usuario: string;
  contrasena: string;
  vehiculos: Vehiculo[];
}

export interface Guardia {
  id: number;
  nombre: string;
  cedula: string;
  telefono: string;
  usuario: string;
  contrasena: string;
}
