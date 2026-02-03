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
import { AuditoriaService } from '../auditoria.service';

interface Movimiento {
  id: number;
  placa: string;
  horaAcceso: string;
  horaSalida: string;
  tipoUsuario: 'Residente' | 'Visitante' | 'No Registrado';
  persona: string;
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

  constructor(private auditoriaSrv: AuditoriaService) {}

  ngOnInit(): void {
    this.cargarDatos();
    
    // Escuchar cambios en localStorage
    window.addEventListener('storage', () => {
      this.cargarDatos();
    });
  }

  cargarDatos(): void {
  this.auditoriaSrv.getAuditoria('AUDITORIA_TODOS').subscribe({
    next: (data) => {


      this.datosTabla = data.map((reg, index) => ({
        id: index + 1,
        placa: reg.placa,
        persona: reg.persona ?? 'Desconocido',
        tipoUsuario: reg.tipo as any,
        horaAcceso: reg.fecha
          ? new Date(reg.fecha).toLocaleString()
          : '',
        horaSalida: reg.horaSalida
          ? new Date(reg.horaSalida).toLocaleTimeString()
          : 'En curso'
      }));

      this.dataSource = new MatTableDataSource(this.datosTabla);
      this.dataSource.filterPredicate = this.customFilterPredicate;
    },
    error: err => alert('Error al cargar auditoría: ' + err.message)
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

    return placaMatch && usuarioMatch;
  }

  // Se llama en (keyup) del input y (selectionChange) de los selects
 aplicarFiltros() {

  if (this.tipoUsuarioFiltro === 'Residente') {
    this.auditoriaSrv.getAuditoria('AUDITORIA_RESIDENTES').subscribe(d => this.mapear(d));
    return;
  }

  if (this.tipoUsuarioFiltro === 'Visitante') {
    this.auditoriaSrv.getAuditoria('AUDITORIA_VISITANTES').subscribe(d => this.mapear(d));
    return;
  }

  if (this.busquedaPlaca) {
    this.auditoriaSrv.getAuditoria('BUSCAR_POR_PLACA', this.busquedaPlaca)
      .subscribe(d => this.mapear(d));
    return;
  }

  this.cargarDatos();
}

private mapear(data: any[]) {
  this.datosTabla = data.map((reg, index) => ({
    id: index + 1,
    placa: reg.placa,
    persona: reg.persona ?? 'Desconocido',
    tipoUsuario: reg.tipo,
    horaAcceso: new Date(reg.fecha).toLocaleString(),
    horaSalida: reg.horaSalida
      ? new Date(reg.horaSalida).toLocaleTimeString()
      : 'En curso'
  }));

  this.dataSource.data = this.datosTabla;
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