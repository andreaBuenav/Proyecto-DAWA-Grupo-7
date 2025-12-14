import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Guardia } from './models/programData';

const GUARDIAS_DATA: Guardia[] = [
  { id: 1, nombre: 'Carlos Jara', cedula: 'Mañana', telefono: '099123456', usuario: 'Activo', contrasena: '123' },
  { id: 2, nombre: 'Luis Paredes', cedula: 'Tarde', telefono: '098765432', usuario: 'Activo', contrasena: '123' },
  { id: 3, nombre: 'Jose Torres', cedula: 'Noche', telefono: '097654321', usuario: 'Suspendido', contrasena: '123' },
  { id: 4, nombre: 'Eduardo Medina', cedula: 'Mañana', telefono: '096112233', usuario: 'Activo', contrasena: '123' },
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

  constructor() {
    const data = localStorage.getItem('guardias');
    if (data) {
      this.tablaGuardias$.next(JSON.parse(data));
    } else {
      this.tablaGuardias$.next(GUARDIAS_DATA);
    }
  }
}
