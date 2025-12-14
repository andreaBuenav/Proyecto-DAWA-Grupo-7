import { Injectable } from '@angular/core';

export interface RegistroAcceso {
  placa: string;
  persona: string | null;
  tipo: 'Residente' | 'Visitante' | 'No Registrado';
  fecha: string;
  hora: string;
  acceso: boolean;
  horaSalida?: string;
}

/**
 * Servicio para gestionar el registro de accesos al sistema.
 * Almacena los registros de entrada y salida de vehículos en localStorage.
 */
@Injectable({
  providedIn: 'root',
})
export class AccesoService {
  private accesos: RegistroAcceso[] = [];

  /**
   * Constructor del servicio.
   * Carga los accesos almacenados en localStorage si existen.
   */
  constructor() {
    const data = localStorage.getItem('accesos');
    if (data) this.accesos = JSON.parse(data);
  }

  /**
   * Registra un nuevo acceso en el sistema.
   * @param registro - Datos del acceso a registrar (placa, persona, tipo, fecha, hora, etc.)
   */
  registrarAcceso(registro: RegistroAcceso) {
    this.accesos.push(registro);
    localStorage.setItem('accesos', JSON.stringify(this.accesos));
  }

  /**
   * Obtiene todos los registros de acceso almacenados.
   * @returns Array de registros de acceso
   */
  getAccesos() {
    return this.accesos;
  }
}
