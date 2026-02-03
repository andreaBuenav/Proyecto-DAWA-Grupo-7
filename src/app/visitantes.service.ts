import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Visitante } from './models/programData';
import { AutorizacionService } from '../app/autorizacion-service';

@Injectable({
  providedIn: 'root'
})
export class VisitantesService {
  private baseUrl = 'http://localhost:5000/api/Visitante/';

  constructor(private http: HttpClient, private authService: AutorizacionService) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  // =============================
  // OBTENER VISITANTES
  // =============================
  getVisitantes(): Observable<Visitante[]> {
    const usuario = this.authService.obtenerUsuario();
    const body = {
      Transaccion: 'CONSULTAR_VISITANTES',
      IdResidente: usuario?.id_residente || null,
      Rol: usuario?.rol || null
    };

    return this.http.post<any[]>(this.baseUrl + 'GetVisitante', body, { headers: this.getHeaders() })
      .pipe(
        map(res => res.map(v => ({
          id: v.idVisitante,
          nombreCompleto: v.nombre,
          identificacion: v.identificacion,
          placaVehiculo: v.placa,
          fechaInicio: new Date(v.validoDesde),
          fechaFin: new Date(v.validoHasta)
        })))
      );
  }

  // =============================
  // AGREGAR O MODIFICAR VISITANTE
  // =============================
  saveVisitante(visitante: any, isEdit: boolean): Observable<any> {
    const usuario = this.authService.obtenerUsuario();
    const body = {
      Transaccion: isEdit ? 'MODIFICAR_VISITANTE' : 'INSERTAR_VISITANTE',
      IdVisitante: visitante.id,
      IdResidente: usuario?.id_residente || null,
      Nombre: visitante.nombreCompleto,
      Identificacion: visitante.identificacion,
      Placa: visitante.placaVehiculo,
      ValidoDesde: visitante.fechaInicio,
      ValidoHasta: visitante.fechaFin
    };

    return this.http.post(this.baseUrl + 'SetVisitante', body, { headers: this.getHeaders() });
  }

  // =============================
  // ELIMINAR VISITANTE
  // =============================
  deleteVisitante(id: number): Observable<any> {
    const body = {
      Transaccion: 'ELIMINAR_VISITANTE',
      IdVisitante: id
    };

    return this.http.post(this.baseUrl + 'SetVisitante', body, { headers: this.getHeaders() });
  }
}
