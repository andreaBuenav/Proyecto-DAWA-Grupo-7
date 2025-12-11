import { Injectable } from '@angular/core';

export interface RegistroAcceso {
  placa: string;
  persona: string | null;
  tipo: 'Residente' | 'Visitante' | 'No Registrado';
  fecha: string;
  hora: string;
  acceso: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AccesoService {
  private accesos: RegistroAcceso[] = [];

  constructor() {
    const data = localStorage.getItem('accesos');
    if (data) this.accesos = JSON.parse(data);
  }

  registrarAcceso(registro: RegistroAcceso) {
    this.accesos.push(registro);
    localStorage.setItem('accesos', JSON.stringify(this.accesos));
  }

  getAccesos() {
    return this.accesos;
  }
}
