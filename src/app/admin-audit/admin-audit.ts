import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importaciones de Angular Material
import { MatTableModule, MatTableDataSource } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { delay, of } from 'rxjs'; 

// Interfaz para la estructura de datos
interface Movimiento {
  id: number;
  placa: string;
  horaAcceso: string;
  horaSalida: string;
  tiempoPermanencia: string;
  tipoUsuario: 'Residente' | 'Visitante';
  tipoPlaca: 'Particular' | 'Comercial'; 
}

// Simulación de datos
const initialAuditData: Movimiento[] = [
    { id: 1, placa: 'ABC-123', horaAcceso: '2024-10-26 09:30', horaSalida: '10:50', tiempoPermanencia: '1h 15min', tipoUsuario: 'Residente', tipoPlaca: 'Particular' },
    { id: 2, placa: 'XYZ-987', horaAcceso: '2024-10-26 11:00', horaSalida: '12:00', tiempoPermanencia: '1h 00min', tipoUsuario: 'Residente', tipoPlaca: 'Particular' },
    { id: 3, placa: 'DEF-456', horaAcceso: '2024-10-26 12:00', horaSalida: '13:00', tiempoPermanencia: '1h 00min', tipoUsuario: 'Visitante', tipoPlaca: 'Comercial' },
    { id: 4, placa: 'GHI-789', horaAcceso: '2024-10-26 14:00', horaSalida: '15:30', tiempoPermanencia: '1h 30min', tipoUsuario: 'Residente', tipoPlaca: 'Particular' },
    { id: 5, placa: 'JKL-012', horaAcceso: '2024-10-26 16:10', horaSalida: '16:45', tiempoPermanencia: '0h 35min', tipoUsuario: 'Visitante', tipoPlaca: 'Comercial' },
];

// Servicio simulado para inyección
export class AuditoriaServiceSimulado {
    public tablaAuditoria$ = of(initialAuditData).pipe(delay(100));
}

@Component({
  selector: 'app-admin-audit',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './admin-audit.html',
  styleUrls: ['./admin-audit.css'],
  providers: [AuditoriaServiceSimulado], 
})
export class AdminAudit implements OnInit {
  
  // Columnas visibles en la tabla (similar a tu componente Guardias)
  columnas: string[] = ['id', 'placa', 'horaAcceso', 'horaSalida', 'tiempoPermanencia', 'tipoUsuario', 'tipoPlaca'];
  
  dataSource = new MatTableDataSource<Movimiento>([]);
  datosTabla: Movimiento[] = []; 
  
  // Modelos para los filtros del template
  tipoUsuarioFiltro: string = '';
  tipoPlacaFiltro: string = '';
  busquedaPlaca: string = ''; 

  pestanaActiva: string = 'Auditoría';

  constructor(private auditoriaSrv: AuditoriaServiceSimulado) {}

  ngOnInit(): void {
    this.auditoriaSrv.tablaAuditoria$.subscribe(data => {
      this.datosTabla = data; 
      this.dataSource = new MatTableDataSource<Movimiento>(data);
      this.dataSource.filterPredicate = this.customFilterPredicate;
    });
  }

  // Predicado para filtros combinados (Placa + Selects)
  customFilterPredicate = (data: Movimiento, filter: string): boolean => {
    const searchTerms = JSON.parse(filter);
    
    // 1. Filtro de búsqueda por Placa
    const placaMatch = data.placa.toLowerCase().includes(searchTerms.placa.toLowerCase());

    // 2. Filtro Tipo de Usuario
    const usuarioMatch = searchTerms.tipoUsuario 
      ? data.tipoUsuario.toLowerCase() === searchTerms.tipoUsuario.toLowerCase()
      : true;

    // 3. Filtro Tipo de Placa
    const placaTypeMatch = searchTerms.tipoPlaca 
      ? data.tipoPlaca.toLowerCase() === searchTerms.tipoPlaca.toLowerCase()
      : true;

    return placaMatch && usuarioMatch && placaTypeMatch;
  }

  // Se llama en (keyup) del input y (selectionChange) de los selects
  aplicarFiltros() {
    const filterObject = {
      placa: this.busquedaPlaca,
      tipoUsuario: this.tipoUsuarioFiltro,
      tipoPlaca: this.tipoPlacaFiltro,
    };
    this.dataSource.filter = JSON.stringify(filterObject);
  }

  cambiarPestana(pestana: string) {
    this.pestanaActiva = pestana;
  }

  exportarPDF() {
    console.log('Exportando a PDF...');
  }

  exportarExcel() {
    console.log('Exportando a Excel...');
  }
}