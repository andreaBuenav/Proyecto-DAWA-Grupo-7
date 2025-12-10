import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Guardia {
  id: number;
  nombre: string;
  cedula: string;
  telefono: string;
  usuario: string;
  estado?: string;
  contrasena: string;
}

const GUARDIAS_DATA: Guardia[] = [
  { id: 1, nombre: 'Carlos Jara', cedula: '08768765465', telefono: '099123456', usuario: 'cjara', estado: 'Activo', contrasena: '123' },
  { id: 2, nombre: 'Luis Paredes', cedula: '09283746352', telefono: '098765432', usuario: 'lparedes', estado: 'Activo', contrasena: '123' },
  { id: 3, nombre: 'Jose Torres', cedula: '09738472647', telefono: '097654321', usuario: 'jtorres', estado: 'Suspendido', contrasena: '123' },
  { id: 4, nombre: 'Eduardo Medina', cedula: '09383746352', telefono: '096112233', usuario: 'emedina', estado: 'Activo', contrasena: '123' },
];

@Injectable({
  providedIn: 'root'
})
export class GuardiasService {

  guardiaSeleccionado$ = new BehaviorSubject<any>({});
  tablaGuardias$ = new BehaviorSubject<any>(GUARDIAS_DATA);
  public guardarEnLocalStorage() {
    localStorage.setItem('guardias', JSON.stringify(this.tablaGuardias$.value));
  }

  /**
   * Restablece la tabla a los datos por defecto (GUARDIAS_DATA)
   * y guarda ese estado en localStorage.
   */
  public resetToDefaults() {
    this.tablaGuardias$.next(GUARDIAS_DATA);
    this.guardarEnLocalStorage();
  }

  constructor() {
    const data = localStorage.getItem('guardias');
    if (data) {
      this.tablaGuardias$.next(JSON.parse(data));
    } else {
      this.tablaGuardias$.next(GUARDIAS_DATA);
    }
  }
}
