import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class GuardiaService {

    baseUrl: string = 'http://localhost:5000/api/Guardias/';

    constructor(private http: HttpClient) { }

    getGuardia(body: any) {
  let auth_token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`
  });

  return this.http.post<any[]>(
    this.baseUrl + 'GetGuardia',
    body,
    { headers }
  );
}

    updateGuardia(body: any) {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  });

  return this.http.post(
    this.baseUrl + 'PostGuardia', 
    body,
    { headers }
  );
}
}
