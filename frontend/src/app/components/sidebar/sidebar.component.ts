import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="fixed top-0 left-0 h-screen w-64 shadow-2xl border-r-2 border-yellow-400/40 flex flex-col py-8 px-4 z-40" style="background: linear-gradient(135deg, #000000ff 0%, #272529ff 50%, #222121ff 100%);">
      <div class="flex flex-col items-center mb-8">
        <svg class="w-12 h-12 mb-2" fill="none" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#FFD600"/><path d="M32 18a10 10 0 0 1 10 10v2a10 10 0 0 1-20 0v-2a10 10 0 0 1 10-10z" fill="#23232b"/><path d="M22 40c0-3.314 4.477-6 10-6s10 2.686 10 6v2H22v-2z" fill="#23232b"/></svg>
        <span class="text-yellow-400 font-extrabold text-xl">FitMatch</span>
      </div>
      <nav class="flex flex-col gap-4">
        <ng-container *ngIf="userType === 'player'; else teamMenu">
          <a routerLink="/profile" class="sidebar-link">Perfil</a>
          <a routerLink="/profile/edit" class="sidebar-link">Editar Perfil</a>
          <a routerLink="/vacancies" class="sidebar-link">Vagas Disponíveis</a>
          <a routerLink="/matches" class="sidebar-link">Candidaturas</a>
          <a routerLink="/historia-jogos" class="sidebar-link">Histórico de Jogos</a>
        </ng-container>
        <ng-template #teamMenu>
          <a routerLink="/dashboard" class="sidebar-link">Dashboard</a>
          <a routerLink="/publish-vacancy" class="sidebar-link">Publicar Vaga</a>
          <a routerLink="/edit-team" class="sidebar-link">Editar Time</a>
          <a routerLink="/manage-roster" class="sidebar-link">Gerenciar Elenco</a>
          <a routerLink="/registrar-jogo" class="sidebar-link">Registrar Jogo</a>
          <a routerLink="/matches" class="sidebar-link">Candidaturas Recebidas</a>
        </ng-template>
        <button (click)="logout()" class="mt-8 w-full py-2 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-gray-900 font-bold shadow hover:scale-105 transition">Sair</button>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar-link {
      display: block;
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      color: #FFD600;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.2s, color 0.2s, transform 0.2s;
    }
    .sidebar-link:hover {
      background: #FFD60022;
      color: #fff;
      transform: scale(1.05);
    }
  `]
})
export class SidebarComponent {

  
  userType: string | null = null;

  constructor(private auth: AuthService, private router: Router) {
    this.userType = this.auth.getUserType();
  }

  logout() {
    this.auth.logout();
  }
}
