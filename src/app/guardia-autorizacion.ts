import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GuardiaService } from '../app/guardia.service';

@Injectable({ providedIn: 'root' })
export class GuardiasService {

  tablaGuardias$ = new BehaviorSubject<any[]>([]);
  guardiaSeleccionado$ = new BehaviorSubject<any>(null);

  constructor(private api: GuardiaService) {}

  // =========================
  // |  CONSULTAR
  // =========================
  cargarGuardias() {
    const body = { Transaccion: 'CONSULTAR_GUARDIAS' };
    this.api.getGuardia(body).subscribe({
      next: (data: any[]) => this.tablaGuardias$.next(data),
      error: err => console.error(err)
    });
  }

  // =========================
  // INSERTAR / MODIFICAR
  // =========================
  guardarGuardia(guardia: any, esNuevo: boolean) {
    guardia.Transaccion = esNuevo ? 'INSERTAR_GUARDIA' : 'MODIFICAR_GUARDIA';
    return this.api.updateGuardia(guardia);
  }

  // =========================
  // ELIMINAR
  // =========================
  eliminarGuardia(id: number) {
    const body = {
      Transaccion: 'ELIMINAR_GUARDIA',
      Id: id
    };
    return this.api.updateGuardia(body);
  }
}
