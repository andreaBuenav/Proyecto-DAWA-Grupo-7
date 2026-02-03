import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Control } from './interfaces/control';

@Injectable({
  providedIn: 'root'
})
export class ControlAccesoService {

  private apiUrl = 'http://localhost:5000/api/Control';

  constructor(private http: HttpClient) {}

  getAccesos(): Observable<Control[]> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  });

  return this.http.post<Control[]>(
    `${this.apiUrl}/GetAccesos`,
    {
      transaccion: 'HISTORIAL_48_HORAS'
    },
    { headers }
  );
}

  registrarSalida(idAcceso: number): Observable<any> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  });

  return this.http.post<any>(
    `${this.apiUrl}/PostAcceso`,
    {
      idAcceso,
      transaccion: 'REGISTRAR_SALIDA'
    },
    { headers }
  );
}


}

