import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // ← doit correspondre au backend réel

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  register(data: FormData) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
