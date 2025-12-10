import { Component } from '@angular/core';
import { GuardiasService } from '../guardia-autorizacion';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta-guardia',
  imports: [FormsModule, CommonModule],
  templateUrl: './consulta-guardia.html',
  styleUrl: './consulta-guardia.css',
})
export class ConsultaGuardia {
  guardia: any = {};

  // validations
  get isNombreValid() {
    if (!this.guardia || !this.guardia.nombre) return false;
    const value = this.guardia.nombre.trim();
    if (value.length === 0) return false;
    // allow letters, spaces and common accents
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value);
  }

  isFormValid() {
    const ced = (this.guardia.cedula || '').toString().replace(/\D/g, '');
    const tel = (this.guardia.telefono || '').toString().replace(/\D/g, '');
    return this.isNombreValid && ced.length === 10 && tel.length === 10;
  }

  get isNew() {
    const tabla = this.guardiasSrv.tablaGuardias$.value || [];
    return tabla.findIndex((g: any) => g.id === this.guardia.id) === -1;
  }

  get title() {
    return this.isNew ? 'Nuevo Guardia' : 'Editar Guardia';
  }

  constructor(
    private guardiasSrv: GuardiasService,
    public dialogRef: MatDialogRef<ConsultaGuardia>
  ) {
    this.guardiasSrv.guardiaSeleccionado$.subscribe(data => {
      this.guardia = { ...data };
      if (!this.guardia.telefono) {
        this.guardia.telefono = '09';
      }
    });
  }

  onCedulaInput() {
    if (!this.guardia) return;
    const cleaned = (this.guardia.cedula || '').toString().replace(/\D/g, '');
    this.guardia.cedula = cleaned.slice(0, 10);
  }

  onNombreInput() {
    if (!this.guardia) return;
    const cleaned = (this.guardia.nombre || '').toString().replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
    this.guardia.nombre = cleaned;
  }

  onDigitsKeypress(event: KeyboardEvent) {
    try {
      if (!event || !event.key) return;
      if (event.key.length > 1) return;
      if (!/^[0-9]$/.test(event.key)) {
        event.preventDefault();
      }
    } catch (err) { /* ignore */ }
  }

  onDigitsPaste(evt: ClipboardEvent) {
    evt.preventDefault();
    const paste = (evt.clipboardData || (window as any).clipboardData).getData('text') || '';
    const cleaned = paste.replace(/\D/g, '').slice(0, 10);
    const el = evt.target as HTMLInputElement;
    if (!el) return;
    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    el.value = (el.value || '').slice(0, start) + cleaned + (el.value || '').slice(end);
    el.dispatchEvent(new Event('input'));
  }

  onNombreKeypress(event: KeyboardEvent) {
    try {
      if (!event || !event.key) return;
      if (event.key.length > 1) return; 
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]$/.test(event.key)) {
        event.preventDefault();
      }
    } catch (err) { /* ignore */ }
  }

  onNombrePaste(evt: ClipboardEvent) {
    evt.preventDefault();
    const paste = (evt.clipboardData || (window as any).clipboardData).getData('text') || '';
    const cleaned = paste.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
    const el = evt.target as HTMLInputElement;
    if (!el) return;
    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    el.value = (el.value || '').slice(0, start) + cleaned + (el.value || '').slice(end);
    el.dispatchEvent(new Event('input'));
  }

  onTelefonoInput() {
    if (!this.guardia) return;
    let cleaned = (this.guardia.telefono || '').toString().replace(/\D/g, '');
    if (cleaned.startsWith('09')) {
      this.guardia.telefono = cleaned.slice(0, 10);
      return;
    }
    cleaned = cleaned.replace(/^0+/, '');
    this.guardia.telefono = ('09' + cleaned).slice(0, 10);
  }

  guardar() {
    let tabla = this.guardiasSrv.tablaGuardias$.value;
    const index = tabla.findIndex((g: any) => g.id === this.guardia.id);

    // keep 'usuario' independent from 'estado' (user can set both separately)

    if (index >= 0) {
      tabla[index] = this.guardia;
    } else {
      tabla.push(this.guardia);
    }

    this.guardiasSrv.tablaGuardias$.next([...tabla]);
    this.guardiasSrv.guardarEnLocalStorage();
    this.dialogRef.close();
  }
}