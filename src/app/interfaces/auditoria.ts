export interface Auditoria {
  IdAcceso: number;
  Placa: string;
  Persona?: string;
  Tipo: string;
  Acceso: boolean;
  Fecha: Date;
  HoraSalida?: Date;
  transaccion?: string;
}
