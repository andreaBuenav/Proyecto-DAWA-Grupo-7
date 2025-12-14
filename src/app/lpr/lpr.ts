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
    private residentesSrv: ResidentesService,
    private visitantesSrv: VisitantesService,
    private accesosSrv: AccesoService
  ) { }

  imagen: File | null = null;
  imagenPreview: string | null = null;

  placa: string = '';
  infoVehiculo: any = null;

  vehiculos = [
    { placa: 'ABC123', dueno: 'Juan Pérez', acceso: true },
    { placa: 'AXC-0123', dueno: 'María Torres', acceso: true },
    { placa: 'PBC2456', dueno: 'Carlos Ruiz', acceso: true }
  ];

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
   * Registra automáticamente un acceso en el sistema.
   * Crea un registro con la información de la placa detectada y la persona asociada.
   * El acceso se marca como permitido o denegado según si el vehículo está registrado.
   * @private
   */
  private registrarAutomatico() {
  const fecha = new Date();
  const registro = {
    placa: this.placa,
    persona: this.infoVehiculo ? this.infoVehiculo.dueno : null,
    tipo: this.infoVehiculo ? this.infoVehiculo.tipo : 'No Registrado',
    fecha: fecha.toLocaleDateString(),
    hora: fecha.toLocaleTimeString(),
    acceso: this.infoVehiculo !== null
  };

  this.accesosSrv.registrarAcceso(registro);
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

  // Buscar residente
  const residentes = this.residentesSrv.tablaResidentes$.value;
  const residenteMatch = residentes.find((r: any) =>
    r.vehiculos.some((v: any) => v.placa.replace(/\s/g, '').toUpperCase() === this.placa)
  );

  if (residenteMatch) {
    this.infoVehiculo = {
      dueno: residenteMatch.nombre,
      acceso: true,
      tipo: 'Residente'
    };
    this.registrarAutomatico();  // AUTO REGISTRO
    return;
  }

  // Buscar visitante
  const visitantes = this.visitantesSrv.getVisitantes();
  const visitanteMatch = visitantes.find(v =>
    v.placaVehiculo?.toUpperCase() === this.placa
  );

  if (visitanteMatch) {
    this.infoVehiculo = {
      dueno: visitanteMatch.nombreCompleto,
      acceso: true,
      tipo: 'Visitante'
    };
    this.registrarAutomatico(); // AUTO REGISTRO
    return;
  }

  // No registrado
  this.infoVehiculo = null;
  this.registrarAutomatico(); // Registra como denegado
}

}
