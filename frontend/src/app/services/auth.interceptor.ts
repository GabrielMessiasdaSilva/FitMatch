import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isBrowser: boolean;

  // Injetamos PLATFORM_ID no construtor
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    // Definimos se estamos no navegador ou no servidor (SSR)
    this.isBrowser = isPlatformBrowser(platformId);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token: string | null = null;
    
    // O localStorage só é acessível se estivermos no navegador
    if (this.isBrowser) {
      token = localStorage.getItem('token');
    }

    // Se houver um token, clonamos a requisição para adicionar o cabeçalho de Autorização
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    // Se não houver token (ou se for SSR), a requisição original é enviada
    return next.handle(request);
  }
}