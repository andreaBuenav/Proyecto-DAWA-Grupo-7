import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuditoriaDTO {
  idAcceso: number;
  persona: string;
  placa: string;
  fecha: string;
  horaSalida?: string;
  tipo: string;
}

@Injectable({ providedIn: 'root' })
export class AuditoriaService {

  private apiUrl = 'http://localhost:5000/api/Auditoria';

  constructor(private http: HttpClient) {}

  getAuditoria(transaccion: string, placa?: string): Observable<AuditoriaDTO[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const body: any = {
      transaccion
    };

    if (placa) {
      body.placa = placa;
    }

    return this.http.post<AuditoriaDTO[]>(
      `${this.apiUrl}/GetAuditoria`,
      body,
      { headers }
    );
  }
}
