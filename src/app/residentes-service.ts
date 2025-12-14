import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Residente } from './models/programData';

const RESIDENTES_DATA: Residente[] = [
  {
    id: 1,
    nombre: "Juan Pérez",
    cedula: "1102567890",
    telefono: "099111222",
    usuario: "juanperez1",
    contrasena: "123456",
    vehiculos: [
      { placa: "ABC-123", modelo: "Kia Rio", estado: "Activo" }
    ]
  },
  {
    id: 2,
    nombre: "Ana Morales",
    cedula: "1104758912",
    telefono: "098765432",
    usuario: "anamora12",
    contrasena: "12356",
    vehiculos: [
      { placa: "PBC-981", modelo: "Chevrolet Spark", estado: "Inactivo" },
      { placa: "LBA-443", modelo: "Mazda CX5", estado: "Activo" }
    ]
  }
];

/**
 * Servicio para gestionar la información de residentes y sus vehículos.
 * Utiliza BehaviorSubject para mantener el estado reactivo y localStorage para persistencia.
 */
@Injectable({
  providedIn: 'root'
})
export class ResidentesService {

  /** Observable del residente actualmente seleccionado */
  residenteSeleccionado$ = new BehaviorSubject<any>({});
  
  /** Observable con la lista completa de residentes */
  tablaResidentes$ = new BehaviorSubject<any>(RESIDENTES_DATA);

  /**
   * Constructor del servicio.
   * Carga los residentes desde localStorage si existen, o usa los datos por defecto.
   */
  constructor() {
    const data = localStorage.getItem('residentes');
    if (data) {
      this.tablaResidentes$.next(JSON.parse(data));
    }
  }

  /**
   * Guarda la lista actual de residentes en localStorage.
   * Utilizado para persistir los cambios realizados en la gestión de residentes.
   */
  public guardarEnLocalStorage() {
    localStorage.setItem('residentes', JSON.stringify(this.tablaResidentes$.value));
  }
}
