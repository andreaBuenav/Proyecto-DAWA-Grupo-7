import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ResidenteService {

    baseUrl: string = 'http://localhost:5000/api/Residente/';

    constructor(private http: HttpClient) { }

    getResidente(body: any) {
  let auth_token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`
  });

  return this.http.post<any[]>(
    this.baseUrl + 'GetResidente',
    body,
    { headers }
  );
}

    updateResidente(body: any) {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  });

  return this.http.post(
    this.baseUrl + 'PostResidente', 
    body,
    { headers }
  );
}

private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }


}
