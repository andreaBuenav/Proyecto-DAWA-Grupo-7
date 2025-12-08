import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuVertical } from '../menu-vertical/menu-vertical';
interface Registro {
  nombre: string;
  tipo: 'Residente' | 'Visitante';
  placa: string;
  estado: 'ACEPTADO' | 'DENEGADO';
  registrado: 'Sí' | 'No';
  horaSalida?: string;
}

@Component({
  selector: 'panel-control',
  imports: [MatTableModule, CommonModule, MatButtonModule, FormsModule, MenuVertical],
  templateUrl: './panel-control.html',
  styleUrls: ['./panel-control.css'],
})
export class PanelControl {

  constructor(private rutasPaginas:Router){}

  registros: Registro[] = [
    {
      nombre: 'Juan Pérez',
      tipo: 'Residente',
      placa: 'ABC-123',
      estado: 'ACEPTADO',
      registrado: 'Sí',
    },
    {
      nombre: 'María López',
      tipo: 'Visitante',
      placa: 'XYZ-789',
      estado: 'DENEGADO',
      registrado: 'No',
    },
    {
      nombre: 'Carlos Gómez',
      tipo: 'Residente',
      placa: 'DEF-456',
      estado: 'ACEPTADO',
      registrado: 'Sí',
    },
  ];

  filtro: string = '';

  get registrosFiltrados(): Registro[] {
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
  }
}
