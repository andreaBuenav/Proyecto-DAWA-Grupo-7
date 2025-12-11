import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ResidentesService } from '../residentes-service';
import { ConsultaResidente } from '../consulta-residente/consulta-residente';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private residentesSrv: ResidentesService) {}

  ngOnInit(): void {
    this.residentesSrv.tablaResidentes$.subscribe(data => {
      this.datosTabla = data;
      this.dataSource = new MatTableDataSource<any>(data);
    });
  }

  filtrar(event: any) {
    const valor = event.target.value.trim().toLowerCase();
    this.dataSource.filter = valor;
  }

  editar(row: any) {
    this.residentesSrv.residenteSeleccionado$.next(row);
    this.dialog.open(ConsultaResidente, { width: '800px', height: '800px' });
  }

  eliminar(row: any) {
    const index = this.datosTabla.findIndex((g: any) => g.id === row.id);
    this.datosTabla.splice(index, 1);
    this.residentesSrv.tablaResidentes$.next(this.datosTabla);
    this.residentesSrv.guardarEnLocalStorage();
  }

  nuevoResidente() {
    const nuevo = {
      id: this.generarId(),
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

  generarId() {
    const tabla = this.residentesSrv.tablaResidentes$.value;
    if (tabla.length === 0) return 1;
    return Math.max(...tabla.map((g: any) => g.id)) + 1;
  }


}
