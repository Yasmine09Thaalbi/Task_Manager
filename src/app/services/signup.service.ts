import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private backendUrl = 'http://localhost:3000';  // Remplacez cela par l'URL réelle de votre backend

  constructor(private http: HttpClient) {}

  enregistrerDonnees(formData: any): Observable<any> {
    const url = `${this.backendUrl}/signup`;
    return this.http.post<any>(url, formData);
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.backendUrl}/login`;
    const data = { username, password };
    return this.http.post<any>(url, data);
  }
}
