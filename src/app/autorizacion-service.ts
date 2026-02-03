import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UsuarioSesion {
  usuario: string;
  rol: 'ADMIN' | 'RESIDENTE' | 'GUARDIA';
  Id_guardia?: number | null;
  nombre_guardia?: string | null;
  id_residente?: number | null;
  nombre_residente?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  private logeadoSubject = new BehaviorSubject<boolean>(false);
  private usuarioSubject = new BehaviorSubject<UsuarioSesion | null>(null);

  logeado$ = this.logeadoSubject.asObservable();
  usuario$ = this.usuarioSubject.asObservable();

  constructor() {
    this.cargarSesion();
  }

  // =============================
  // GUARDAR SESIÓN
  // =============================
  guardarSesion(token: string, usuario: UsuarioSesion) {
  console.log('USUARIO GUARDADO EN SESIÓN:', usuario);

  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));
  this.logeadoSubject.next(true);
  this.usuarioSubject.next(usuario);
}

  // =============================
  // CARGAR SESIÓN AL RECARGAR
  // =============================
  private cargarSesion() {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');

    if (token && usuario) {
      this.logeadoSubject.next(true);
      this.usuarioSubject.next(JSON.parse(usuario));
    }
  }

  // =============================
  // CONSULTAS RÁPIDAS
  // =============================
  estaLogueado(): boolean {
    return this.logeadoSubject.value;
  }

  obtenerRol(): string {
    return this.usuarioSubject.value?.rol || '';
  }

  obtenerUsuario(): UsuarioSesion | null {
    return this.usuarioSubject.value;
  }

  // =============================
  // PERMISOS POR ROL
  // =============================
  tienePermiso(modulo: string): boolean {
    const rol = this.obtenerRol();

    const permisos: Record<string, string[]> = {
      ADMINISTRADOR: ['guardias', 'residentes', 'audit', 'visitantes', 'lpr', 'panel-control'],
      RESIDENTE: ['visitantes'],
      GUARDIA: ['lpr', 'panel-control']
    };

    return permisos[rol]?.includes(modulo) ?? false;
  }

  // =============================
  // CERRAR SESIÓN
  // =============================
  cerrarSesion() {
    localStorage.clear();
    this.logeadoSubject.next(false);
    this.usuarioSubject.next(null);
  }
}
