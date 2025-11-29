import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside
      class="
        fixed left-0 w-64 h-[calc(100vh-4rem)] 
        shadow-2xl border-r-2 border-yellow-400/40
        flex flex-col py-8 px-4 z-40
        bg-gradient-to-br from-black via-zinc-800 to-neutral-900
        transition-transform duration-300 transform
        
        top-16           <!-- Sidebar começa abaixo do navbar -->
        md:translate-x-0 <!-- Sidebar sempre visível no desktop -->
      "
      [class.-translate-x-full]="!open"
    >

      <!-- Botão Fechar (somente mobile) -->
      <button 
        class="md:hidden absolute top-4 right-4 p-2 rounded hover:bg-white/10"
        (click)="close.emit()"
      >
        <svg class="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12"/>
          </svg>
      </button>

      <div class="flex flex-col items-center mb-8">
        <svg class="w-12 h-12 mb-2" fill="none" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="32" fill="#FFD600"/>
          <path d="M32 18a10 10 0 0 1 10 10v2a10 10 0 0 1-20 0v-2a10 10 0 0 1 10-10z" fill="#23232b"/>
          <path d="M22 40c0-3.314 4.477-6 10-6s10 2.686 10 6v2H22v-2z" fill="#23232b"/>
        </svg>

        <span class="text-yellow-400 font-extrabold text-xl">FitMatch</span>
      </div>

      <nav class="flex flex-col gap-4">

        <!-- Player -->
        <ng-container *ngIf="userType === 'player'; else teamMenu">
          <a routerLink="/profile" class="sidebar-link">Perfil</a>
          <a routerLink="/profile/edit" class="sidebar-link">Editar Perfil</a>
          <a routerLink="/vacancies" class="sidebar-link">Vagas Disponíveis</a>
          <a routerLink="/matches" class="sidebar-link">Candidaturas</a>
          <a routerLink="/historia-jogos" class="sidebar-link">Histórico de Jogos</a>
        </ng-container>

        <!-- Team -->
        <ng-template #teamMenu>
          <a routerLink="/dashboard" class="sidebar-link">Dashboard</a>
          <a routerLink="/publish-vacancy" class="sidebar-link">Publicar Vaga</a>
          <a routerLink="/edit-team" class="sidebar-link">Editar Time</a>
          <a routerLink="/manage-roster" class="sidebar-link">Gerenciar Elenco</a>
          <a routerLink="/registrar-jogo" class="sidebar-link">Registrar Jogo</a>
          <a routerLink="/matches" class="sidebar-link">Candidaturas Recebidas</a>
        </ng-template>

        <button 
          (click)="logout()" 
          class="mt-8 w-full py-2 rounded-xl 
                 bg-gradient-to-r from-yellow-400 to-yellow-300 
                 text-gray-900 font-bold shadow hover:scale-105 transition">
          Sair
        </button>
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
      transition: 0.2s;
    }
    .sidebar-link:hover {
      background: #FFD60022;
      color: white;
      transform: scale(1.05);
    }
  `]
})
export class SidebarComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  userType = this.auth.getUserType();

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
  }
}
