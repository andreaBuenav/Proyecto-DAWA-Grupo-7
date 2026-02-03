import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { ResidentesService } from '../residentes-service';
import { ResidenteService } from '../residente.service';

@Component({
  selector: 'app-consulta-residente',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './consulta-residente.html',
  styleUrl: './consulta-residente.css',
})
export class ConsultaResidente {
  residente: any = { vehiculos: [] };

  constructor(
    private residentesSrv: ResidentesService,
    private residenteApiService: ResidenteService,
    private dialogRef: MatDialogRef<ConsultaResidente>
  ) {
    this.residentesSrv.residenteSeleccionado$.subscribe(data => {
      // Nos aseguramos de que vehiculos siempre sea un array
      this.residente = { ...data, vehiculos: data.vehiculos ? [...data.vehiculos] : [] };
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
  const esNuevo = !this.residente.id || this.residente.id <= 0;
  this.residente.Transaccion = esNuevo ? 'INSERTAR_RESIDENTE' : 'MODIFICAR_RESIDENTE';

  if (esNuevo) {
    this.residente.id = 0; 
  }

  if (this.residente.vehiculos && this.residente.vehiculos.length > 0) {
    this.residente.Placa = this.residente.vehiculos[0].placa;
    this.residente.Modelo = this.residente.vehiculos[0].modelo;
    this.residente.Estado = this.residente.vehiculos[0].estado === 'Activo';
  }

  this.residente.Contraseña = this.residente.contrasena;
  this.residente.Rol = 'RESIDENTE';

  this.residenteApiService.updateResidente(this.residente).subscribe({
    next: (res: any) => {
      if (res.respuesta === 'OK') {
        alert('Residente guardado exitosamente.');
        this.dialogRef.close(true);
      } else {
        alert(res.leyenda);
      }
    },
    error: (err) => {
      alert('Error al guardar el residente: ' + err.message);
    }
  });
}


}