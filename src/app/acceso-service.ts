import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  private apiUrl = 'http://localhost:5000/api/Acceso/ProcesarPlaca';

  constructor(private http: HttpClient) {}

  procesarPlaca(placa: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(
      this.apiUrl,
      {
        placa,
        transaccion: 'PROCESAR'
      },
      { headers }
    );
  }
}

