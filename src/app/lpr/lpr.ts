import { Component } from '@angular/core';
import { createWorker } from 'tesseract.js';
import { CommonModule } from '@angular/common';
import { AccesoService } from '../acceso-service';
import { VisitantesService } from '../visitantes.service';
import { ResidentesService } from '../residentes-service';

@Component({
  selector: 'app-lpr',
  imports: [CommonModule],
  templateUrl: './lpr.html',
  styleUrl: './lpr.css',
})
export class Lpr {

  constructor(

    private accesoSrv: AccesoService
  ) { }

  imagen: File | null = null;
  imagenPreview: string | null = null;

  placa: string = '';
  infoVehiculo: any = null;


  /**
   * Carga una imagen desde un input file y genera una vista previa.
   * @param event - Evento del input file que contiene la imagen seleccionada
   */
  cargarImagen(event: any) {
    this.imagen = event.target.files[0];

    if (!this.imagen) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPreview = reader.result as string;
    };
    reader.readAsDataURL(this.imagen);
  }

  
/**
 * Procesa la imagen cargada para reconocer la placa del vehículo mediante OCR.
 * Busca el vehículo en la base de datos de residentes y visitantes.
 * Registra automáticamente el acceso según el resultado de la búsqueda.
 * 
 * @async
 * @returns {Promise<void>} - Promesa que se resuelve cuando el procesamiento termina
 * 
 * @remarks
 * - Utiliza Tesseract.js para el reconocimiento óptico de caracteres (OCR)
 * - Busca primero en residentes, luego en visitantes
 * - Si no encuentra coincidencia, registra como acceso denegado
 */
async procesar() {
  if (!this.imagen) return;

  const worker = await createWorker('eng');
  const { data } = await worker.recognize(this.imagen);

  this.placa = data.text.replace(/\s/g, '').toUpperCase();

  this.accesoSrv.procesarPlaca(this.placa).subscribe({
    next: (resp) => {
      this.infoVehiculo = {
        placa: resp.placa,
        persona: resp.persona,
        tipo: resp.tipo,
        acceso: resp.acceso,
        fechaHora: resp.fechaHora
      };
    },
    error: (err) => {
      alert('Error al procesar la placa: ' + err.message);

      this.infoVehiculo = {
        placa: this.placa,
        persona: 'Desconocido',
        tipo: 'Error',
        acceso: false
      };
    }
  });
}


}
