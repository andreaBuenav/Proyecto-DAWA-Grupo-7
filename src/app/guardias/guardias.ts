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
  
  columnas: string[] = ['id', 'nombre', 'cedula', 'telefono', 'usuario', 'estado', 'contrasena','action'];
  dataSource: any = [];
  datosTabla: any = [];

  dialog = inject(MatDialog);

  constructor(private guardiasSrv: GuardiasService) {}

  ngOnInit(): void {
    this.guardiasSrv.tablaGuardias$.subscribe(data => {
      // ensure legacy rows have both 'usuario' and 'estado' populated
      this.datosTabla = (data || []).map((r: any) => ({
        ...r,
        usuario: r.usuario ?? r.estado ?? '',
        estado: r.estado ?? r.usuario ?? ''
      }));

      const mapped = this.datosTabla;
      if (this.dataSource && this.dataSource instanceof MatTableDataSource) {
        this.dataSource.data = mapped;
        const searchEl = document.querySelector('.buscador') as HTMLInputElement | null;
        const currentFilter = searchEl?.value?.trim().toLowerCase() || '';
        this.dataSource.filter = currentFilter;
      } else {
        this.dataSource = new MatTableDataSource<any>(mapped);
      }
    });
  }

  filtrar(event: any) {
    const valor = event.target.value.trim().toLowerCase();
    this.dataSource.filter = valor;
  }  

  editar(row: any) {
    this.guardiasSrv.guardiaSeleccionado$.next(row);
    this.dialog.open(ConsultaGuardia, { width: '340px' });
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
    usuario: 'Activo',
    estado: 'Activo',
    contrasena: '',
    
  };

  this.guardiasSrv.guardiaSeleccionado$.next(nuevo);

  this.dialog.open(ConsultaGuardia, {
    width: '340px'
  });
}

generarId() {
  const tabla = this.guardiasSrv.tablaGuardias$.value;
  if (tabla.length === 0) return 1;
  return Math.max(...tabla.map((g: any) => g.id)) + 1;
}
}