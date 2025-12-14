import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GuardiasService } from '../guardia-autorizacion';
import { MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ConsultaGuardia } from '../consulta-guardia/consulta-guardia';
import { MatIconModule } from '@angular/material/icon';


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
    this.dialog.open(ConsultaGuardia, { width: '340px' });
  }

  /**
   * Elimina un guardia del sistema.
   * @param row - Datos del guardia a eliminar
   */
  eliminar(row: any) {
    const index = this.datosTabla.findIndex((g: any) => g.id === row.id);
    this.datosTabla.splice(index, 1);
    this.guardiasSrv.tablaGuardias$.next(this.datosTabla);
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

  this.dialog.open(ConsultaGuardia, {
    width: '340px'
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