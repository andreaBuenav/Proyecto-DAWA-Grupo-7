import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizacionService } from '../autorizacion-service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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

  // Métodos para verificar permisos
  puedeVerGuardias(): boolean {
    return this.autoriza.tienePermiso('guardias');
  }

  puedeVerResidentes(): boolean {
    return this.autoriza.tienePermiso('residentes');
  }

  puedeVerAudit(): boolean {
    return this.autoriza.tienePermiso('audit');
  }

  puedeVerVisitantes(): boolean {
    return this.autoriza.tienePermiso('visitantes');
  }

  puedeVerLpr(): boolean {
    return this.autoriza.tienePermiso('lpr');
  }

  puedeVerPanelControl(): boolean {
    return this.autoriza.tienePermiso('panel-control');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 900;
    if (!this.isMobile) {
      this.menuOpen = true;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    if (this.isMobile) {
      this.menuOpen = false;
    }
  }

  mostrarPrincipalModulos() {
    this.rutasPaginas.navigate(['/principal']);
    this.closeMenu();
  }

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
