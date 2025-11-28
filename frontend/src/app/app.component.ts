import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
  <div class="min-h-screen flex flex-col text-slate-100" style="background: linear-gradient(115deg, #000000ff 0%, #000000ff 50%, #000000ff 100%);">
    <!-- TOPBAR -->
    <header class="h-16 backdrop-blur-md flex items-center px-6 justify-between border-b border-white/10 sticky top-0 z-50">
      <div class="flex items-center gap-4">
        <a routerLink="/" class="text-2xl font-extrabold tracking-tighter hover:opacity-90 transition-opacity">
            <span class="text-white">FIT</span><span class="text-amber-400">MATCH</span>
          </a>
      </div>
      <div class="flex items-center gap-3">
        <ng-container *ngIf="auth.isAuthenticated(); else guest">
          <div class="text-sm text-slate-400">{{ auth.getUserType() || '' }}</div>
          <div class="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-indigo-400 flex items-center justify-center text-slate-900 font-bold">{{ auth.getUserEmail()?.charAt(0)?.toUpperCase() }}</div>
          <button (click)="auth.logout()" class="ml-2 px-4 py-2 rounded bg-rose-600 text-white font-bold">Sair</button>
        </ng-container>
        <ng-template #guest>
          <a routerLink="/login" class="text-sm font-bold px-4 py-2 rounded-lg transition border border-amber-400 bg-black text-white hover:bg-amber-400 hover:text-black hover:border-white">Entrar</a>
          <a routerLink="/register" class="text-sm font-bold px-4 py-2 rounded-lg transition border border-amber-400 bg-black text-white hover:bg-amber-400 hover:text-black hover:border-white">Cadastrar</a>
        </ng-template>
      </div>
    </header>
    <!-- SIDEBAR -->
    <ng-container *ngIf="auth.isAuthenticated()">
      <app-sidebar></app-sidebar>
    </ng-container>
    <!-- MAIN -->
    <main class="flex-1 ml-0 md:ml-256">
      <router-outlet></router-outlet>
    </main>
  </div>
  `
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
