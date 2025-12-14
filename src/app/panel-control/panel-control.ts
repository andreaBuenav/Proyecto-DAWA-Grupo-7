import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccesoService, RegistroAcceso } from '../acceso-service';
import { BehaviorSubject } from 'rxjs';

interface RegistroPanel {
  nombre: string;
  tipo: 'Residente' | 'Visitante' | 'No Registrado';
  placa: string;
  estado: 'ACEPTADO' | 'DENEGADO';
  registrado: 'Sí' | 'No';
  fechaEntrada: string;
  horaEntrada: string;
  horaSalida?: string;
}

@Component({
  selector: 'panel-control',
  imports: [MatTableModule, CommonModule, MatButtonModule, FormsModule],
  templateUrl: './panel-control.html',
  styleUrls: ['./panel-control.css'],
})
export class PanelControl implements OnInit {

  constructor(
    private rutasPaginas: Router,
    private accesoSrv: AccesoService
  ) {}

  // Se usa para actualizar la tabla automáticamente
  private registrosSubject = new BehaviorSubject<RegistroPanel[]>([]);
  registros: RegistroPanel[] = [];

  filtro: string = '';

  ngOnInit() {
    this.cargarRegistros();

    // Observa cambios del storage en vivo
    window.addEventListener("storage", () => {
      this.cargarRegistros();
    });

    this.registrosSubject.subscribe(data => {
      this.registros = data;
    });
  }

  cargarRegistros() {
  const data: RegistroAcceso[] = this.accesoSrv.getAccesos();

  const convertidos: RegistroPanel[] = data.map(reg => ({
    nombre: reg.persona ?? 'Desconocido',
    tipo: reg.tipo,
    placa: reg.placa,
    estado: (reg.acceso ? 'ACEPTADO' : 'DENEGADO') as 'ACEPTADO' | 'DENEGADO',
    registrado: (reg.acceso ? 'Sí' : 'No') as 'Sí' | 'No',
    fechaEntrada: reg.fecha,
    horaEntrada: reg.hora,
      horaSalida: reg.horaSalida
  }));

  this.registrosSubject.next(convertidos);
}


  get registrosFiltrados(): RegistroPanel[] {
    if (!this.filtro) return this.registros;

    const filtroLower = this.filtro.toLowerCase();

    return this.registros.filter(
      (reg) =>
        reg.nombre.toLowerCase().includes(filtroLower) ||
        reg.tipo.toLowerCase().includes(filtroLower) ||
        reg.placa.toLowerCase().includes(filtroLower) ||
        reg.estado.toLowerCase().includes(filtroLower) ||
        reg.registrado.toLowerCase().includes(filtroLower)
    );
  }

  ingresarHoraSalida(index: number) {
    const hora = new Date().toLocaleTimeString();
    this.registros[index].horaSalida = hora;

    // Actualizar en vivo el localStorage
    const almacenados = this.accesoSrv.getAccesos();
    if (almacenados[index]) {
      (almacenados as any)[index].horaSalida = hora;
      localStorage.setItem('accesos', JSON.stringify(almacenados));
    }

    // Refrescar los registros en la vista
    this.cargarRegistros();
  }
}