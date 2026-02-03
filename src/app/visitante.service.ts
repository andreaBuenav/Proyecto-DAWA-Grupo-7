import { Injectable } from '@angular/core';
import { Visitante } from './models/programData'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class VisitanteService {
private baseUrl = 'http://localhost:5000/api/Visitante';

  constructor(private http: HttpClient) {}

  getVisitantes(body: any) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<Visitante[]>(
      `${this.baseUrl}/GetVisitante`,
      body,
      { headers }
    );
  }

  setVisitante(body: any) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(
      `${this.baseUrl}/SetVisitante`,
      body,
      { headers }
    );
  }
}
