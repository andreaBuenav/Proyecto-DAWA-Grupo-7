import { Component } from '@angular/core';
import { GuardiasService } from '../guardia-autorizacion';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta-guardia',
  imports: [FormsModule, CommonModule],
  templateUrl: './consulta-guardia.html',
  styleUrl: './consulta-guardia.css',
})
export class ConsultaGuardia {
  guardia: any = {};

  constructor(
    private guardiasSrv: GuardiasService,
    private dialogRef: MatDialogRef<ConsultaGuardia>
  ) {
    this.guardiasSrv.guardiaSeleccionado$.subscribe(data => {
      this.guardia = { ...data }; // copia independiente
    });
  }

  guardar() {
    let tabla = this.guardiasSrv.tablaGuardias$.value;
    const index = tabla.findIndex((g: any) => g.id === this.guardia.id);

    if (index >= 0) {
      // EDITAR
      tabla[index] = this.guardia;
    } else {
      // NUEVO
      tabla.push(this.guardia);
    }

    this.guardiasSrv.tablaGuardias$.next([...tabla]);
    this.guardiasSrv.guardarEnLocalStorage();
    this.dialogRef.close();
  }
}
