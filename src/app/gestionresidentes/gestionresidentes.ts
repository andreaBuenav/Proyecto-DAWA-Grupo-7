import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ResidentesService } from '../residentes-service';
import { ConsultaResidente } from '../consulta-residente/consulta-residente';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ResidenteService } from '../residente.service';

/**
 * Componente para la gestión de residentes.
 * Permite crear, editar, eliminar y filtrar residentes del sistema.
 */
@Component({
  selector: 'app-gestionresidentes',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule, MatIconModule ],
  templateUrl: './gestionresidentes.html',
  styleUrl: './gestionresidentes.css',
})
export class Gestionresidentes implements OnInit {

  columnas: string[] = [
    'id', 'nombre', 'cedula', 'telefono', 'usuario', 'contrasena','action'
  ];

  dataSource: any = [];
  datosTabla: any = [];

  dialog = inject(MatDialog);

  residentes = new FormGroup({
    Transaccion: new FormControl(),
  });

  constructor(
      private residenteService: ResidenteService,
      private residentesSrv: ResidentesService,
    ) {}
  
  vehiculos: any[] = [];

ngOnInit(): void {
  this.residentesSrv.tablaResidentes$.subscribe(data => {
    this.datosTabla = data;
    this.dataSource = new MatTableDataSource<any>(data);
  });

  this.residentesSrv.tablaVehiculos$.subscribe(data => {
    this.vehiculos = data;
  });

  this.obtenerResidentes();
  }

  obtenerResidentes() {
  this.residentes.value.Transaccion = 'CONSULTAR_RESIDENTES';
  this.residenteService.getResidente(this.residentes.value).subscribe({
    next: (data: any) => {
      // 1. Enviamos los residentes a su Subject
      if (data.residentes) {

      const residentesMapeados = data.residentes.map((r: any) => ({
        ...r,
        contrasena: r['contraseña']
      }));

      this.residentesSrv.tablaResidentes$.next(residentesMapeados);
    }

      // 2. Enviamos los vehículos a su propio Subject
      if (data.vehiculos) {
        this.residentesSrv.tablaVehiculos$.next(data.vehiculos);
      }
    },
    error: (err) => {
      console.error('Error API:', err);
    },
  });
}

  /**
   * Filtra los residentes en la tabla según el texto ingresado.
   * @param event - Evento del input de búsqueda
   */
  filtrar(event: any) {
    const valor = event.target.value.trim().toLowerCase();
    this.dataSource.filter = valor;
  }

  /**
   * Abre el modal de edición para un residente existente.
   * @param row - Datos del residente a editar
   */
 editar(row: any) {

  // 1 Tomamos todos los vehículos
  const vehiculos = this.residentesSrv.tablaVehiculos$.value || [];

  // 2 Filtramos solo los del residente
  const vehiculosDelResidente = vehiculos.filter(
    (v: any) => v.dueno === row.nombre
  );

  // 3 Creamos un objeto COMPLETO
  const residenteCompleto = {
    ...row,
    vehiculos: vehiculosDelResidente
  };

  // 4 Lo enviamos al modal
  this.residentesSrv.residenteSeleccionado$.next(residenteCompleto);

  this.dialog.open(ConsultaResidente, {
    width: '800px',
    height: '800px'
  });
}

  /**
   * Elimina un residente del sistema.
   * @param row - Datos del residente a eliminar
   */
  eliminar(row: any) {
  if (confirm(`¿Está seguro de eliminar al residente ${row.nombre}?`)) {
    const payload = {
      Id: row.id,
      Transaccion: 'ELIMINAR_RESIDENTE'
    };

    this.residenteService.updateResidente(payload).subscribe({
      next: (res: any) => {
        if (res.respuesta === 'OK') {
          // Refrescamos la lista completa desde el servidor
          this.obtenerResidentes();
        } else {
          alert('Error al eliminar: ' + res.leyenda);
        }
      },
      error: (err) => console.error('Error API:', err)
    });
  }
}

  /**
   * Abre el modal para crear un nuevo residente.
   * Genera automáticamente un ID único.
   */
  nuevoResidente() {
    const nuevo = {
      id: null,
      nombre: '',
      cedula: '',
      telefono: '',
      usuario: '',
      contrasena: '',
      vehiculos: []
    };

    this.residentesSrv.residenteSeleccionado$.next(nuevo);

    this.dialog.open(ConsultaResidente, {
      width: '500px',
      height: '600px'
    });
  }

  /**
   * Genera un ID único para un nuevo residente.
   * @returns El siguiente ID disponible
   */
  generarId() {
    const tabla = this.residentesSrv.tablaResidentes$.value;
    if (tabla.length === 0) return 1;
    return Math.max(...tabla.map((g: any) => g.id)) + 1;
  }


}
