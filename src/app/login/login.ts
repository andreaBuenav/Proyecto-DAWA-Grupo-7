import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AutorizacionService } from '../autorizacion-service';

/**
 * Componente de inicio de sesión del sistema.
 * Permite autenticar usuarios mediante credenciales.
 */
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user = '';
  password = '';

  constructor(private rutasPaginas:Router, private autoriza:AutorizacionService) {}

  /**
   * Procesa el intento de inicio de sesión.
   * Valida las credenciales y redirige al usuario si son correctas.
   */
  onAccept() {
    if (this.autoriza.autenticar(this.user, this.password)) {
      alert('Acceso concedido');
      this.rutasPaginas.navigate(['/principal']);
    } else {
      alert('Error en credenciales');
    }
  }



}