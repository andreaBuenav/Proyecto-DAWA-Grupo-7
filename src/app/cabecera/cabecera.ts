import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutorizacionService } from '../autorizacion-service';

@Component({
  selector: 'app-cabecera',
  imports: [CommonModule],
  templateUrl: './cabecera.html',
  styleUrls: ['./cabecera.css'],
})
export class Cabecera {
    logueadoCabecera = false;
    nombreUsuario = '';

    constructor(private rutasPaginas:Router, private autoriza:AutorizacionService) {}
  
  ngOnInit(): void {
    this.autoriza.logeado$.subscribe(data => {
      this.logueadoCabecera = data;
      console.log(this.logueadoCabecera);
      this.autoriza.usuarioLogeado$.subscribe(nombre => this.nombreUsuario = nombre);
    })
  }

  mostrarLogin(){
    this.rutasPaginas.navigate(['/login']);
  }

  cerrarSesion(){
    this.autoriza.logeado$.next(false);
    this.rutasPaginas.navigate(['']);
  }

}
