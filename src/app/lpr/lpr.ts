import { Component } from '@angular/core';
import { createWorker } from 'tesseract.js';
import { CommonModule } from '@angular/common';
import { MenuVertical } from '../menu-vertical/menu-vertical';

@Component({
  selector: 'app-lpr',
  imports: [CommonModule, MenuVertical],
  templateUrl: './lpr.html',
  styleUrl: './lpr.css',
})
export class Lpr {
  imagen: File | null = null;
  imagenPreview: string | null = null;

  placa: string = '';
  infoVehiculo: any = null;

  vehiculos = [
    { placa: 'ABC123', dueno: 'Juan Pérez', acceso: true },
    { placa: 'AXC-0123', dueno: 'María Torres', acceso: true },
    { placa: 'PBC2456', dueno: 'Carlos Ruiz', acceso: true }
  ];

  cargarImagen(event: any) {
    this.imagen = event.target.files[0];

    if (!this.imagen) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPreview = reader.result as string;
    };
    reader.readAsDataURL(this.imagen);
  }

  async procesar() {
    if (!this.imagen) return;

    // Tesseract.js versión nueva
    const worker = await createWorker('eng');
    const { data } = await worker.recognize(this.imagen);

    this.placa = data.text.replace(/\s/g, '').toUpperCase();
    this.infoVehiculo = this.vehiculos.find(v => v.placa === this.placa) || null;
  }
}
