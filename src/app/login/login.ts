import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AutorizacionService } from '../autorizacion-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/**
 * Componente de inicio de sesión del sistema.
 * Permite autenticar usuarios mediante credenciales.
 */
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MatIcon, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user: string = '';
  password: string = '';
  loading = false;

  private apiUrl = 'http://localhost:5000/api/Usuario/GetUsuarioAccess';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AutorizacionService
  ) {}

  onAccept() {
    if (!this.user || !this.password) {
      alert('Ingrese usuario y contraseña');
      return;
    }

    this.loading = true;

    const body = {
      transaccion: 'LOGIN',
      usuario: this.user,
      clave: this.password
    };

    this.http.post<any>(this.apiUrl, body).subscribe({
      next: (resp) => {
        this.authService.guardarSesion(resp.token, resp.usuario);
        this.router.navigate(['/principal']);
        this.loading = false;
      },
      error: () => {
        alert('Usuario o contraseña incorrectos');
        this.loading = false;
      }
    });
  }



}