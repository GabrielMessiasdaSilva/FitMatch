import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { TeamsService } from '../../services/teams.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-players',
  template: `
    <div class="players-page">

  <div class="header">
    <h1>Encontrar Jogadores</h1>
    <p class="subtitle">Filtre e encontre atletas perto de você</p>
  </div>

  <form class="filter-card" [formGroup]="filterForm">
    
    <mat-form-field appearance="outline">
      <mat-label>Posição</mat-label>
      <input matInput formControlName="position" placeholder="Ex: Atacante">
      <mat-icon matSuffix>sports</mat-icon>
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Bairro</mat-label>
      <input matInput formControlName="neighborhood" placeholder="Ex: Mooca">
      <mat-icon matSuffix>location_on</mat-icon>
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Esporte</mat-label>
      <input matInput formControlName="sport" placeholder="Ex: Futebol">
      <mat-icon matSuffix>stadium</mat-icon>
    </mat-form-field>

    <button mat-raised-button color="primary" class="filter-btn" (click)="loadPlayers()">
      Filtrar
    </button>

  </form>

  <div class="card-grid">

    <mat-card class="player-card" *ngFor="let player of players">

      <mat-card-header>
        <div mat-card-avatar class="avatar">
          {{ player.name?.charAt(0).toUpperCase() }}
        </div>
        <mat-card-title>{{ player.name }}</mat-card-title>
        <mat-card-subtitle>{{ player.neighborhood }}</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <p><mat-icon>person</mat-icon> <strong>Posição:</strong> {{ player.position }}</p>
        <p><mat-icon>sports_soccer</mat-icon> <strong>Esportes:</strong> {{ player.sports?.join(', ') }}</p>
        <p><mat-icon>calendar_month</mat-icon> <strong>Idade:</strong> {{ player.age }}</p>
      </mat-card-content>

      <mat-card-actions *ngIf="userType === 'team'">
        <button mat-stroked-button color="accent" (click)="invitePlayer(player.id)">
          <mat-icon>send</mat-icon> Convidar
        </button>
      </mat-card-actions>

    </mat-card>

  </div>

</div>

  `,
  styles: [`
.players-page {
  padding: 24px 32px;
  animation: fadeIn .4s ease-in-out;
}

/* ===== HEADER ===== */
.header {
  text-align: center;
  margin-bottom: 28px;
}

.header h1 {
  margin: 0;
  font-size: 34px;
  font-weight: 800;
  color: #1b1b1b;
}

.header .subtitle {
  margin-top: 6px;
  color: #555;
  font-size: 15px;
}

/* ===== FILTER CARD ===== */
.filter-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 22px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 18px rgba(0,0,0,0.06);
  margin-bottom: 34px;
}

.filter-card mat-form-field {
  width: 100%;
}

/* Botão */
.filter-btn {
  height: 56px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 10px;
  letter-spacing: .3px;
}

/* ===== GRID ===== */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 26px;
}

/* ===== PLAYER CARD ===== */
.player-card {
  background: linear-gradient(180deg, #fff 0%, #fafafa 100%) !important;
  border-radius: 18px !important;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 18px rgba(0,0,0,.06);
  transition: .25s ease;
}

.player-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 26px rgba(0,0,0,.10);
}

/* ===== HEADER DO CARD ===== */
.player-card mat-card-header {
  padding: 18px 22px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 14px;
}

/* Avatar premium */
.player-card .avatar {
  background: #00308F;
  color: #FFDD00;
  width: 54px;
  height: 54px;
  font-size: 22px;
  border-radius: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 800;
  box-shadow: inset 0 0 10px rgba(255,255,255,0.25);
}

/* Título e subtítulo */
.player-card mat-card-title {
  font-size: 21px;
  font-weight: 800;
  color: #ffffffff !important;
}

.player-card mat-card-subtitle {
  font-size: 13.5px;
  color: #606060 !important;
  margin-top: -2px;
}

/* ===== CONTENT ===== */
.player-card mat-card-content {
  padding: 18px 22px;
  color: #afa8a8ff;
}

.player-card mat-card-content p {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0;
  font-size: 14.5px;
}

/* Ícones minimalistas */
.player-card mat-card-content mat-icon {
  font-size: 20px;
  color: #3f51b5;
}

/* ===== AÇÕES ===== */
.player-card mat-card-actions {
  padding-left: 18px;
  padding-bottom: 18px;
}

/* Botão do convite */
.player-card button[mat-stroked-button] {
  border-radius: 10px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: .3px;
}

/* ===== ANIMAÇÃO ===== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

  `]
})
export class PlayersComponent implements OnInit {
  players: any[] = [];
  filterForm: FormGroup;
  userType: string | null = '';

  constructor(
    private playersService: PlayersService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.userType = this.auth.getUserType();
    this.filterForm = this.fb.group({
      position: [''],
      neighborhood: [''],
      sport: ['']
    });
  }

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers() {
    const filters = this.filterForm.value;
    // Remove chaves vazias
    Object.keys(filters).forEach(key => filters[key] === '' && delete filters[key]);
    
    this.playersService.getPlayers(filters).subscribe(data => {
      this.players = data;
    });
  }

  invitePlayer(id: string) {
      // Funcionalidade extra: Poderia ser implementada como mensagem ou match reverso
      console.log('Convidar', id);
  }
}