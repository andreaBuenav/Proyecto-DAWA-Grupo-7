import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GuardiasService } from '../guardia-autorizacion';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ConsultaGuardia } from '../consulta-guardia/consulta-guardia';


@Component({
  selector: 'app-guardias',
  imports: [MatTableModule, CommonModule, MatButtonModule],
  templateUrl: './guardias.html',
  styleUrls: ['./guardias.css'],
})
export class GuardiasComponent implements OnInit {

  columnas: string[] = ['id', 'nombre', 'turno', 'telefono', 'estado', 'action'];
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
    this.dialog.open(ConsultaGuardia, { width: '450px', height: '500px' });
  }

  eliminar(row: any) {
    const index = this.datosTabla.findIndex((g: any) => g.id === row.id);
    this.datosTabla.splice(index, 1);
    this.guardiasSrv.tablaGuardias$.next(this.datosTabla);
  }
}
