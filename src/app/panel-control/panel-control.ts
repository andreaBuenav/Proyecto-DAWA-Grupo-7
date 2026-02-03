import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ControlAccesoService } from '../control-acceso-service';
import { Control } from '../interfaces/control';

interface RegistroPanel {
  idAcceso: number;
  nombre: string;
  tipo: string;
  placa: string;
  estado: 'ACEPTADO' | 'DENEGADO';
  fechaEntrada: string;
  horaSalida?: string;
}


/**
 * Componente para el panel de control de accesos.
 * Muestra los registros de entrada/salida y permite gestionar las horas de salida.
 */
@Component({
  selector: 'panel-control',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule, FormsModule],
  templateUrl: './panel-control.html',
  styleUrls: ['./panel-control.css'],
})
export class PanelControl implements OnInit {

  registros: any[] = [];
  filtro: string = '';

  constructor(private controlSrv: ControlAccesoService) {}

  ngOnInit() {
    this.cargarRegistros();
  }

  cargarRegistros() {
  this.controlSrv.getAccesos().subscribe({
    next: (data: any[]) => {
      this.registros = data.map(reg => ({
        idAcceso: reg.idAcceso,
        nombre: reg.persona ?? 'Desconocido',
        tipo: reg.tipo,
        placa: reg.placa,
        estado: reg.acceso ? 'ACEPTADO' : 'DENEGADO',
        fechaEntrada: reg.fecha
          ? new Date(reg.fecha).toLocaleDateString()
          : '',
        horaEntrada: reg.fecha
          ? new Date(reg.fecha).toLocaleTimeString()
          : '',
        horaSalida: reg.horaSalida
          ? new Date(reg.horaSalida).toLocaleTimeString()
          : null
      }));
    },
    error: err => alert('Error al cargar registros: ' + err.message)
  });
}


  registrarSalida(registro: any) {
    if (registro.horaSalida) return;

    this.controlSrv.registrarSalida(registro.idAcceso).subscribe({
      next: () => this.cargarRegistros(),
      error: err => alert('Error al registrar salida: ' + err.message)
    });
  }

  get registrosFiltrados() {
    if (!this.filtro) return this.registros;

    const f = this.filtro.toLowerCase();
    return this.registros.filter(r =>
      r.nombre.toLowerCase().includes(f) ||
      r.placa.toLowerCase().includes(f) ||
      r.tipo.toLowerCase().includes(f)
    );
  }
}