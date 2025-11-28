import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-black text-slate-100">
    <!-- TOPBAR -->
    <header class="h-16 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center px-6 justify-between border-b border-slate-800">
      <div class="flex items-center gap-4">
        <div class="text-lg font-extrabold text-amber-400">FITMATCH</div>
      </div>
      <div class="flex items-center gap-3">
        <ng-container *ngIf="auth.isAuthenticated(); else guest">
          <div class="text-sm text-slate-400">{{ auth.getUserType() || '' }}</div>
          <div class="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-indigo-400 flex items-center justify-center text-slate-900 font-bold">{{ auth.getUserEmail()?.charAt(0)?.toUpperCase() }}</div>
          <button (click)="auth.logout()" class="ml-2 px-4 py-2 rounded bg-rose-600 text-white font-bold">Sair</button>
        </ng-container>
        <ng-template #guest>
          <a routerLink="/login" class="text-sm text-amber-400 px-4 py-2 rounded bg-slate-800 font-bold">Entrar</a>
          <a routerLink="/register" class="text-sm text-amber-400 px-4 py-2 rounded bg-slate-900 font-bold border border-amber-400 ml-2">Cadastrar</a>
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
