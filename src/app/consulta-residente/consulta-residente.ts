import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResidentesService } from '../residentes-service';

@Component({
  selector: 'app-consulta-residente',
  imports: [FormsModule, CommonModule],
  templateUrl: './consulta-residente.html',
  styleUrl: './consulta-residente.css',
})
export class ConsultaResidente {
residente: any = {};

  constructor(
    private residentesSrv: ResidentesService,
    private dialogRef: MatDialogRef<ConsultaResidente>
  ) {
    this.residentesSrv.residenteSeleccionado$.subscribe(data => {
      this.residente = { ...data, vehiculos: [...data.vehiculos] };
    });
  }

  agregarVehiculo() {
    this.residente.vehiculos.push({
      placa: '',
      modelo: '',
      estado: 'Activo'
    });
  }

  eliminarVehiculo(index: number) {
    this.residente.vehiculos.splice(index, 1);
  }

  guardar() {
    let tabla = this.residentesSrv.tablaResidentes$.value;
    const index = tabla.findIndex((g: any) => g.id === this.residente.id);

    if (index >= 0) tabla[index] = this.residente;
    else tabla.push(this.residente);

    this.residentesSrv.tablaResidentes$.next([...tabla]);
    this.residentesSrv.guardarEnLocalStorage();
    this.dialogRef.close();
  }
}
