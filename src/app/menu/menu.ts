import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizacionService } from '../autorizacion-service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Componente del menú lateral de navegación.
 * Maneja la navegación entre módulos y control de permisos por rol.
 * Incluye funcionalidad responsive con menú hamburguesa para móviles.
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule]
})

export class Menu {
  logueadoCabecera = false;
  nombreUsuario = '';
  isMobile = false;
  menuOpen = false;

  constructor(private rutasPaginas: Router, private autoriza: AutorizacionService) {}

  ngOnInit() {
    this.checkScreenSize();
  }

  /**
   * Verifica si el usuario tiene permiso para ver el módulo de guardias.
   * @returns true si tiene permiso, false en caso contrario
   */
  puedeVerGuardias(): boolean {
    return this.autoriza.tienePermiso('guardias');
  }

  /**
   * Verifica si el usuario tiene permiso para ver el módulo de residentes.
   * @returns true si tiene permiso, false en caso contrario
   */
  puedeVerResidentes(): boolean {
    return this.autoriza.tienePermiso('residentes');
  }

  /**
   * Verifica si el usuario tiene permiso para ver el módulo de auditoría.
   * @returns true si tiene permiso, false en caso contrario
   */
  puedeVerAudit(): boolean {
    return this.autoriza.tienePermiso('audit');
  }

  /**
   * Verifica si el usuario tiene permiso para ver el módulo de visitantes.
   * @returns true si tiene permiso, false en caso contrario
   */
  puedeVerVisitantes(): boolean {
    return this.autoriza.tienePermiso('visitantes');
  }

  /**
   * Verifica si el usuario tiene permiso para ver el módulo LPR.
   * @returns true si tiene permiso, false en caso contrario
   */
  puedeVerLpr(): boolean {
    return this.autoriza.tienePermiso('lpr');
  }

  /**
   * Verifica si el usuario tiene permiso para ver el panel de control.
   * @returns true si tiene permiso, false en caso contrario
   */
  puedeVerPanelControl(): boolean {
    return this.autoriza.tienePermiso('panel-control');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  /**
   * Verifica el tamaño de la pantalla y ajusta el modo responsive.
   * @private
   */
  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 900;
    if (!this.isMobile) {
      this.menuOpen = true;
    }
  }

  /**
   * Alterna la visibilidad del menú en modo móvil.
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * Cierra el menú en modo móvil después de seleccionar una opción.
   */
  closeMenu() {
    if (this.isMobile) {
      this.menuOpen = false;
    }
  }

  /**
   * Navega al módulo principal.
   */
  mostrarPrincipalModulos() {
    this.rutasPaginas.navigate(['/principal']);
    this.closeMenu();
  }

  /**
   * Navega al módulo de guardias.
   */
  mostrarGuardias() {
    this.rutasPaginas.navigate(['/app/guardias']);
    this.closeMenu();
  }

  mostrarResidentes() {
    this.rutasPaginas.navigate(['/app/residentes']);
    this.closeMenu();
  }

  mostrarAudit() {
    this.rutasPaginas.navigate(['/app/audit']);
    this.closeMenu();
  }

  mostrarVisitantes() {
    this.rutasPaginas.navigate(['/app/visitantes']);
    this.closeMenu();
  }

  mostrarLpr() {
    this.rutasPaginas.navigate(['/app/lpr']);
    this.closeMenu();
  }

  mostrarPanelControl() {
    this.rutasPaginas.navigate(['/app/panel-control']);
    this.closeMenu();
  }
}
