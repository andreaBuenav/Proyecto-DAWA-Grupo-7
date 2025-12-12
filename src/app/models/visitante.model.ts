export interface Visitante {
  id: number;
  nombreCompleto: string;
  identificacion: string;
  placaVehiculo: string;
  fechaInicio: Date;
  fechaFin: Date;
}

export interface residente {
  id: number;
  nombreCompleto: string;
  identificacion: string;
  placaVehiculo: string;
  fechaInicio: Date;
  fechaFin: Date;
}

export interface LPR {
  id: number;
  placa: string;
  dueno: string;
  acceso: string;
  fechaAcceso: Date;
}
