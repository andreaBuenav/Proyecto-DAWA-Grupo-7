import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { AccesoService, RegistroAcceso } from '../acceso-service'; 


interface Movimiento {
  id: number;
  placa: string;
  horaAcceso: string;
  horaSalida: string;
  tipoUsuario: 'Residente' | 'Visitante' | 'No Registrado';
  persona: string;
  estado: string;
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
})
export class AdminAudit implements OnInit {
  
  columnas: string[] = ['persona', 'placa', 'horaAcceso', 'horaSalida', 'tipoUsuario'];
  
  dataSource = new MatTableDataSource<Movimiento>([]);
  datosTabla: Movimiento[] = []; 
  
  tipoUsuarioFiltro: string = '';
  busquedaPlaca: string = ''; 

  pestanaActiva: string = 'Auditoría';

  constructor(private accesoSrv: AccesoService) {}

  ngOnInit(): void {
    this.cargarDatos();
    
    // Escuchar cambios en localStorage
    window.addEventListener('storage', () => {
      this.cargarDatos();
    });
  }

  cargarDatos(): void {
    const registros: RegistroAcceso[] = this.accesoSrv.getAccesos();
    
    // Convertir RegistroAcceso a Movimiento
    this.datosTabla = registros.map((reg, index) => {
      const entrada = new Date(`${reg.fecha} ${reg.hora}`);
      const salida = reg.horaSalida ? new Date(`${reg.fecha} ${reg.horaSalida}`) : null;
      return {
        id: index + 1,
        placa: reg.placa,
        horaAcceso: `${reg.fecha} ${reg.hora}`,
        horaSalida: reg.horaSalida ? `${reg.fecha} ${reg.horaSalida}` : 'En curso',
        tipoUsuario: reg.tipo,
        persona: reg.persona || 'Desconocido',
        estado: reg.acceso ? 'ACEPTADO' : 'DENEGADO'
      };
    });
    
    this.dataSource = new MatTableDataSource<Movimiento>(this.datosTabla);
    this.dataSource.filterPredicate = this.customFilterPredicate;
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

    return placaMatch && usuarioMatch;
  }

  // Se llama en (keyup) del input y (selectionChange) de los selects
  aplicarFiltros() {
    const filterObject = {
      placa: this.busquedaPlaca,
      tipoUsuario: this.tipoUsuarioFiltro,
    };
    this.dataSource.filter = JSON.stringify(filterObject);
  }

  /**
   * Cambia la pestaña activa en la interfaz.
   * @param pestana - Nombre de la pestaña a activar
   */
  cambiarPestana(pestana: string) {
    this.pestanaActiva = pestana;
  }

  /**
   * Exporta los datos filtrados de la tabla a un archivo PDF.
   * Genera un documento con el reporte de auditoría de accesos.
   */
  exportarPDF() {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Reporte de Auditoría de Accesos', 14, 15);
    
    doc.setFontSize(11);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 25);
    
    const datos = this.dataSource.filteredData;
    
    const filas = datos.map(item => [
      item.id,
      item.persona,
      item.placa,
      item.horaAcceso,
      item.horaSalida,
      item.tipoUsuario,
    ]);

    autoTable(doc, {
      head: [['#', 'Nombre', 'Placa', 'Hora Acceso', 'Hora Salida', 'Tipo Usuario']],
      body: filas,
      startY: 30,
      theme: 'striped',
      headStyles: { fillColor: [37, 37, 37] },
      styles: { fontSize: 9 },
      margin: { top: 30 }
    });
    
    doc.save(`auditoria_${new Date().getTime()}.pdf`);
  }

  /**
   * Exporta los datos filtrados de la tabla a un archivo Excel.
   * Genera una hoja de cálculo con el reporte de auditoría de accesos.
   */
  exportarExcel() {
    const datos = this.dataSource.filteredData;
    
    const datosExcel = datos.map(item => ({
      'ID': item.id,
      'Placa': item.placa,
      'Hora Acceso': item.horaAcceso,
      'Hora Salida': item.horaSalida,
      'Tipo Usuario': item.tipoUsuario,
    }));
    
    // Crear hoja de cálculo
    const worksheet = XLSX.utils.json_to_sheet(datosExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Auditoría');
    
    // Ajustar ancho de columnas
    const maxWidth = datosExcel.reduce((w, r) => Math.max(w, r.Placa.length), 10);
    worksheet['!cols'] = [
      { wch: 5 },  // ID
      { wch: maxWidth }, // Placa
      { wch: 20 }, // Hora Acceso
      { wch: 20 }, // Hora Salida
      { wch: 15 }, // Tipo Usuario
    ];
    
    // Guardar el archivo Excel
    XLSX.writeFile(workbook, `auditoria_${new Date().getTime()}.xlsx`);
  }
}