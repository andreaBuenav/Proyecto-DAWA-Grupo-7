import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Usuario {
  user: string;
  password: string;
  nombreUsuario: string;
  rol: 'admin' | 'residente' | 'guardia';
}

@Injectable({
  providedIn: 'root',
})
export class AutorizacionService {
  
  // Credenciales del sistema con roles
  public usuarios: Usuario[] = [
    {
      user: 'admin',
      password: 'admin123',
      nombreUsuario: 'Ernesto',
      rol: 'admin'
    },
    {
      user: 'residente',
      password: 'residente123',
      nombreUsuario: 'María González',
      rol: 'residente'
    },
    {
      user: 'guardia',
      password: 'guardia123',
      nombreUsuario: 'Carlos Pérez',
      rol: 'guardia'
    }
  ];

  // Usuario actualmente logeado
  public usuarioActual: Usuario | null = null;

  // Variable que me permite determinar si está logeado al sistema
  public logeado$ = new BehaviorSubject<boolean>(false);

  // Guarda el nombre del usuario logeado
  public usuarioLogeado$ = new BehaviorSubject<string>('');

  // Guarda el rol del usuario logeado
  public rolUsuario$ = new BehaviorSubject<string>('');

  // Método para autenticar usuario
  autenticar(username: string, password: string): boolean {
    const usuario = this.usuarios.find(
      u => u.user === username && u.password === password
    );

    if (usuario) {
      this.usuarioActual = usuario;
      this.logeado$.next(true);
      this.usuarioLogeado$.next(usuario.nombreUsuario);
      this.rolUsuario$.next(usuario.rol);
      return true;
    }
    return false;
  }

  // Método para verificar si el usuario tiene permiso
  tienePermiso(modulo: string): boolean {
    if (!this.usuarioActual) return false;

    const permisos: { [key: string]: string[] } = {
      'admin': ['guardias', 'residentes', 'audit', 'visitantes', 'lpr', 'panel-control'],
      'residente': ['visitantes'],
      'guardia': ['lpr', 'panel-control']
    };

    return permisos[this.usuarioActual.rol]?.includes(modulo) || false;
  }

  // Método para obtener el rol actual
  obtenerRol(): string {
    return this.usuarioActual?.rol || '';
  }

  // Método para obtener el nombre de usuario
  obtenerNombreUsuario(): string {
    return this.usuarioActual?.nombreUsuario || '';
  }

  // Método para verificar si está logueado
  estaLogueado(): boolean {
    return this.logeado$.value;
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    this.usuarioActual = null;
    this.logeado$.next(false);
    this.usuarioLogeado$.next('');
    this.rolUsuario$.next('');
  }
}
