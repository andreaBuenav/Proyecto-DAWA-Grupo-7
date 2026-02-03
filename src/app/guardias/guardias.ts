import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GuardiasService } from '../guardia-autorizacion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ConsultaGuardia } from '../consulta-guardia/consulta-guardia';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup } from '@angular/forms';
import { GuardiaService } from '../guardia.service';

/**
 * Componente para la gestión de guardias de seguridad.
 * Permite operaciones CRUD sobre guardias y asignación de turnos.
 */
@Component({
  selector: 'app-guardias',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './guardias.html',
  styleUrls: ['./guardias.css'],
})
export class GuardiasComponent implements OnInit {
  columnas: string[] = [
    'id',
    'nombre',
    'cedula',
    'telefono',
    'usuario',
    'estado',
    'contrasena',
    'action',
  ];
  dataSource: any = [];
  datosTabla: any = [];

  dialog = inject(MatDialog);

  guardias = new FormGroup({
    Transaccion: new FormControl(),
  });

  constructor(
    private guardiaService: GuardiaService,
    private guardiasSrv: GuardiasService,
  ) {}

  ngOnInit(): void {
    this.guardiasSrv.tablaGuardias$.subscribe((data) => {
      this.datosTabla = (data || []).map((r: any) => ({
        ...r,
        nombre: r.nombres,
        contrasena: r.contraseña ?? '',
        estado: r.estado ? 'Activo' : 'Inactivo',
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

    this.obtenerGuardias();
  }

  obtenerGuardias() {
    this.guardias.value.Transaccion = 'CONSULTAR_GUARDIAS';
    this.guardiaService.getGuardia(this.guardias.value).subscribe({
      next: (data: any) => {
        this.guardiasSrv.tablaGuardias$.next(data);
      },
      error: (err) => {
        alert('Error al obtener los guardias: ' + err.message);
      },
    });
  }
  /**
   * Filtra la tabla de guardias según el texto ingresado.
   * @param event - Evento del input de búsqueda
   */
  filtrar(event: any) {
    const valor = event.target.value.trim().toLowerCase();
    this.dataSource.filter = valor;
  }

  /**
   * Abre el modal de edición para un guardia existente.
   * @param row - Datos del guardia a editar
   */

  editar(row: any) {
  this.guardiasSrv.guardiaSeleccionado$.next(row);

  const dialogRef = this.dialog.open(ConsultaGuardia, {
    width: '340px',
  });

  dialogRef.afterClosed().subscribe((actualizo) => {
    if (actualizo) {
      this.obtenerGuardias();
    }
  });

  
}
  /**
   * Elimina un guardia del sistema.
   * @param row - Datos del guardia a eliminar
   */

 eliminar(row: any) {
  const confirmacion = confirm('¿Está seguro de eliminar este guardia?');
  if (!confirmacion) return;

  this.guardiasSrv.eliminarGuardia(row.id).subscribe({
    next: () => this.guardiasSrv.cargarGuardias(),
    error: err => console.error(err)
  });
}

  /**
   * Abre el modal para crear un nuevo guardia.
   * Inicializa con valores por defecto y genera un ID único.
   */

  nuevoGuardia() {
    const nuevo = {
      id: this.generarId(),
      nombre: '',
      cedula: '',
      telefono: '',
      usuario: '',
      estado: 'Activo',
      contrasena: '',
    };

    this.guardiasSrv.guardiaSeleccionado$.next(nuevo);

   const dialogRef = this.dialog.open(ConsultaGuardia, {
    width: '340px',
  });

  dialogRef.afterClosed().subscribe((actualizo) => {
    if (actualizo) {
      this.obtenerGuardias();
    }
  });
  }

  /**
   * Genera un ID único para un nuevo guardia.
   * @returns El siguiente ID disponible basado en el máximo existente
   */

  generarId() {
    const tabla = this.guardiasSrv.tablaGuardias$.value;
    if (tabla.length === 0) return 1;
    return Math.max(...tabla.map((g: any) => g.id)) + 1;
  }
}
