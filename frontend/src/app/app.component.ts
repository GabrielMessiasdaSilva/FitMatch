import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
  <mat-toolbar class="main-toolbar glass">

    <div class="logo-container" routerLink="/">
      <mat-icon class="logo-icon">sports_soccer</mat-icon>
      <span class="app-title">FITMATCH</span>
    </div>

    <span class="spacer"></span>

    <ng-container *ngIf="auth.isAuthenticated()">
      <a mat-button routerLink="/players" class="nav-button">Jogadores</a>
      <a mat-button routerLink="/teams" class="nav-button">Times</a>
      <a mat-button routerLink="/matches" class="nav-button">Partidas</a>

      <button mat-icon-button (click)="auth.logout()" matTooltip="Sair" class="logout-button">
        <mat-icon>logout</mat-icon>
      </button>
    </ng-container>

    <ng-container *ngIf="!auth.isAuthenticated()">
      <a mat-button routerLink="/login" class="nav-button login-button">Login</a>
      <a mat-raised-button routerLink="/register" class="register-button">Cadastrar</a>
    </ng-container>

  </mat-toolbar>

  <div class="main-content fade-in">
    <router-outlet></router-outlet>
  </div>
  `,
  styles: [`

  /* === LAYOUT GERAL === */
  :host {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: linear-gradient(135deg, #0e0e0e, #1a1a1a 40%, #101010);
    color: white;
    font-family: 'Inter', sans-serif;
  }

  /* === TOPBAR GLASS === */
  .glass {
    background: rgba(0, 0, 0, 0.40);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .main-toolbar {
    height: 70px;
    padding: 0 28px;
    display: flex;
    align-items: center;
  }

  .spacer {
    flex: 1;
  }

  /* === LOGO === */
  .logo-container {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: 0.2s;
  }

  .logo-container:hover {
    transform: scale(1.04);
  }

  .logo-icon {
    font-size: 32px;
    color: #FFD600;
  }
.nav-button,
.login-button,
.register-button {
  color: #ffffff !important;
}

  .app-title {
    font-size: 1.7em;
    font-weight: 800;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #FFD600, #FF0066);
    -webkit-background-clip: text;
    color: transparent;
  }

  /* === NAV BUTTONS (LOGADO) === */
  .nav-button {
    color: #e6e6e6;
    font-weight: 500;
    margin: 0 6px;
    padding: 4px 10px;
    transition: 0.2s;
    border-radius: 6px;
  }

  .nav-button:hover {
    background: #574f4fff;
    color: #FFD600;
  }

  /* === LOGOUT ICON === */
  .logout-button {
    color: #FF4E4E;
    margin-left: 10px;
    transition: 0.2s;
  }

  .logout-button:hover {
    transform: scale(1.1);
  }

  /* === BOTÕES (DESLOGADO) === */
  .login-button {
    color: #FFD600;
    font-weight: 600;
  }

  .register-button {
    background: linear-gradient(90deg, #00c851, #009739);
    color: white;
    padding: 6px 16px;
    border-radius: 10px;
    font-weight: 700;
    transition: 0.2s;
  }

  .register-button:hover {
    background: linear-gradient(90deg, #009739, #007d30);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,255,100,0.2);
  }

  /* === CONTEÚDO === */
  .main-content {
    padding: 26px;
    overflow-y: auto;
  }

  /* === ANIMAÇÃO === */
  .fade-in {
    animation: fadeIn 0.5s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  `]
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
