import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Guardia {
  id: number;
  nombre: string;
  turno: string;
  telefono: string;
  estado: string;
}

const GUARDIAS_DATA: Guardia[] = [
  { id: 1, nombre: 'Carlos Jara', turno: 'Mañana', telefono: '099123456', estado: 'Activo' },
  { id: 2, nombre: 'Luis Paredes', turno: 'Tarde', telefono: '098765432', estado: 'Activo' },
  { id: 3, nombre: 'Jose Torres', turno: 'Noche', telefono: '097654321', estado: 'Suspendido' },
  { id: 4, nombre: 'Eduardo Medina', turno: 'Mañana', telefono: '096112233', estado: 'Activo' },
];

@Injectable({
  providedIn: 'root'
})
export class GuardiasService {

  guardiaSeleccionado$ = new BehaviorSubject<any>({});
  tablaGuardias$ = new BehaviorSubject<any>(GUARDIAS_DATA);

  constructor() {}
}
