import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
  <div class="min-h-screen flex flex-col text-slate-100 bg-black">

    <!-- NAVBAR -->
    <header class="h-16 backdrop-blur-md flex items-center px-6 justify-between 
                   border-b border-white/10 sticky top-0 z-50">

      <div class="flex items-center gap-4">

        <!-- Botão Mobile para abrir sidebar -->
        <button 
          *ngIf="auth.isAuthenticated()" 
          class="md:hidden p-2 rounded hover:bg-white/10 transition"
          (click)="sidebarOpen = true"
        >
          <svg class="w-6 h-6" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        <a routerLink="/" class="text-2xl font-extrabold tracking-tighter">
          <span class="text-white">FIT</span><span class="text-amber-400">MATCH</span>
        </a>
      </div>

      <div class="flex items-center gap-3">
        <ng-container *ngIf="auth.isAuthenticated(); else guest">
          <div class="text-sm text-slate-400">{{ auth.getUserType() }}</div>

          <div class="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-indigo-400 
                      flex items-center justify-center text-slate-900 font-bold">
            {{ auth.getUserEmail()?.charAt(0)?.toUpperCase() }}
          </div>

          <button (click)="auth.logout()" 
                  class="ml-2 px-4 py-2 rounded bg-rose-600 text-white font-bold">
            Sair
          </button>
        </ng-container>

        <ng-template #guest>
          <a routerLink="/login" class="text-sm px-4 py-2 rounded border border-amber-400 bg-black 
                                       hover:bg-amber-400 hover:text-black transition font-bold">
            Entrar
          </a>

          <a routerLink="/register" class="text-sm px-4 py-2 rounded border border-amber-400 bg-black 
                                         hover:bg-amber-400 hover:text-black transition font-bold">
            Cadastrar
          </a>
        </ng-template>
      </div>
    </header>

    <!-- OVERLAY MOBILE -->
    <div 
      *ngIf="sidebarOpen" 
      class="fixed inset-0 bg-black/60 z-30 md:hidden"
      (click)="sidebarOpen = false">
    </div>

    <!-- SIDEBAR -->
    <ng-container *ngIf="auth.isAuthenticated()">
      <app-sidebar 
        [open]="sidebarOpen" 
        (close)="sidebarOpen = false">
      </app-sidebar>
    </ng-container>

    <!-- MAIN CONTENT -->
    <main class="flex-1 ml-0 md:ml-256 p-4 transition-all duration-300">
      <router-outlet></router-outlet>
    </main>

  </div>
  `
})
export class AppComponent {
  sidebarOpen = false;

  constructor(public auth: AuthService) {}
}
