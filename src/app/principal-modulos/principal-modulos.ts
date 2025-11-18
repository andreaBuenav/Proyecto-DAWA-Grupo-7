import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-principal-modulos',
  imports: [],
  templateUrl: './principal-modulos.html',
  styleUrl: './principal-modulos.css',
})
export class PrincipalModulos {
   constructor(private rutasPaginas:Router){}

 mostrarGuardias(){
    this.rutasPaginas.navigate(['/guardias']);
  }
 mostrarResidentes(){
    this.rutasPaginas.navigate(['/gestionresidentes']);
  }
}
