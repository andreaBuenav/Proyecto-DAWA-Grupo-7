import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GuardiasService } from '../guardia-autorizacion';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ConsultaGuardia } from '../consulta-guardia/consulta-guardia';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-guardias',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './guardias.html',
  styleUrls: ['./guardias.css'],
})
export class GuardiasComponent implements OnInit {

  columnas: string[] = ['id', 'nombre', 'cedula', 'telefono', 'usuario', 'contrasena','action'];
  dataSource: any = [];
  datosTabla: any = [];

  dialog = inject(MatDialog);

  constructor(private guardiasSrv: GuardiasService) {}

  ngOnInit(): void {

    this.guardiasSrv.tablaGuardias$.subscribe(data => {
      this.datosTabla = data;
      this.dataSource = new MatTableDataSource<any>(data);
    });
  }

  filtrar(event: any) {
    const valor = event.target.value.trim().toLowerCase();
    this.dataSource.filter = valor;
  }

  editar(row: any) {
    this.guardiasSrv.guardiaSeleccionado$.next(row);
    this.dialog.open(ConsultaGuardia, { width: '450px', height: '700px' });
  }

  eliminar(row: any) {
    const index = this.datosTabla.findIndex((g: any) => g.id === row.id);
    this.datosTabla.splice(index, 1);
    this.guardiasSrv.tablaGuardias$.next(this.datosTabla);
  }

  nuevoGuardia() {
  const nuevo = {
    id: this.generarId(),
    nombre: '',
    cedula: '',
    telefono: '',
    usuario: '',
    contrasena: '',
    estado: 'Activo'
  };

  this.guardiasSrv.guardiaSeleccionado$.next(nuevo);

  this.dialog.open(ConsultaGuardia, {
    width: '450px',
    height: '700px'
  });
}

generarId() {
  const tabla = this.guardiasSrv.tablaGuardias$.value;
  if (tabla.length === 0) return 1;
  return Math.max(...tabla.map((g: any) => g.id)) + 1;
}

}
