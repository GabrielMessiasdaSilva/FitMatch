import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (this.isBrowser) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user_type', res.user.type);
          localStorage.setItem('user_id', res.user.id);
        }
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user_type');
      localStorage.removeItem('user_id');
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    return !!localStorage.getItem('token');
  }

  getUserType(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem('user_type');
  }
  
  getUserId(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem('user_id');
  }
}