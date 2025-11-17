import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AutorizacionService } from '../autorizacion-service';

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

  onAccept() {
    const userCorrecto = this.autoriza.usuarioSistema.user;
  const passCorrecto = this.autoriza.usuarioSistema.password;

  if (this.user === userCorrecto && this.password === passCorrecto) {

    alert('Acceso concedido');

    // Actualiza el estado global
    this.autoriza.logeado$.next(true);
    this.autoriza.usuarioLogeado$.next(this.autoriza.usuarioSistema.nombreUsuario);

    // Redirige al principal
    this.rutasPaginas.navigate(['/principal']);

  } else {
    alert('Error en credenciales');
  }
  }



}