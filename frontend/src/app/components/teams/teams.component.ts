import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { MatchesService } from '../../services/matches.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-teams',
  template: `
    <div class="container">
      <h2>Encontrar Times</h2>

      <div class="filter-container" [formGroup]="filterForm">
        <mat-form-field appearance="outline">
          <mat-label>Bairro</mat-label>
          <input matInput formControlName="neighborhood">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Esporte</mat-label>
          <input matInput formControlName="sport">
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="loadTeams()">Filtrar</button>
      </div>

      <div class="card-grid">
        <mat-card *ngFor="let team of teams">
          <mat-card-header>
            <div mat-card-avatar class="avatar-placeholder">{{team.name?.charAt(0)}}</div>
            <mat-card-title>{{team.name || 'Sem Nome'}}</mat-card-title>
            <mat-card-subtitle>{{team.sport}} - {{team.neighborhood}}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p><strong>Vagas:</strong> {{team.neededPositions?.join(', ')}}</p>
            <p><strong>Elenco:</strong> {{team.roster?.length || 0}} jogadores</p>
          </mat-card-content>
          <mat-card-actions align="end">
            <button mat-flat-button color="primary" *ngIf="userType === 'player'" (click)="apply(team.id)">Candidatar-se</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
/* ====== Container ====== */
.container {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  animation: fadeIn .4s ease-in-out;
}

h2 {
  font-size: 32px;
  font-weight: 800;
  color: #1b1b1b;
}

/* ====== Filtros ====== */
.filter-container {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}

mat-form-field {
  width: 220px;
}

/* ====== GRID ====== */
.card-grid {
  display: grid;
  gap: 28px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

/* ====== CARD – FINTECH PREMIUM ====== */
mat-card {
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%) !important;
  border-radius: 18px !important;
  border: 1px solid #e3e6ea;
  padding: 0;

  box-shadow: 0 8px 18px rgba(0,0,0,0.06);
  transition: .25s ease;
}

mat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.10);
}

/* ====== HEADER ====== */
mat-card-header {
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 14px;
  border-bottom: 1px solid #f0f0f0;
}

/* Avatar estilo “app sério” */
.avatar-placeholder {
  background: #3f51b5;
  color: white;

  width: 52px;
  height: 52px;
  font-size: 20px;
  font-weight: 700;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 14px;
  box-shadow: inset 0 0 10px rgba(255,255,255,0.25);
}

/* Títulos do card */
mat-card-title {
  font-size: 21px;
  font-weight: 800;
  color: #111 !important;
}

mat-card-subtitle {
  margin-top: -2px;
  font-size: 13.5px;
  color: #606060 !important;
  font-weight: 500;
}

/* ====== Conteúdo ====== */
mat-card-content {
  padding: 18px 22px;
}

mat-card-content p {
  margin: 6px 0;
  font-size: 14.5px;
  color: #222;
}

mat-card-content p strong {
  color: #000;
  font-weight: 700;
}

/* ====== Botão ====== */
button[mat-flat-button] {
  border-radius: 10px;
  font-weight: 700;
  padding: 8px 14px;
  letter-spacing: .3px;
}

/* ====== Animação ====== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}


  `]
})
export class TeamsComponent implements OnInit {
  teams: any[] = [];
  filterForm: FormGroup;
  userType: string | null = '';

  constructor(
    private teamsService: TeamsService,
    private matchesService: MatchesService,
    private fb: FormBuilder,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.userType = this.auth.getUserType();
    this.filterForm = this.fb.group({
      neighborhood: [''],
      sport: ['']
    });
  }

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    const filters = this.filterForm.value;
    Object.keys(filters).forEach(key => filters[key] === '' && delete filters[key]);

    this.teamsService.getTeams(filters).subscribe(data => {
      this.teams = data;
    });
  }

  apply(teamId: string) {
    this.matchesService.apply(teamId).subscribe({
      next: () => this.snackBar.open('Candidatura enviada com sucesso!', 'Ok', { duration: 3000 }),
      error: (err) => this.snackBar.open(err.error.error || 'Erro ao aplicar', 'Fechar', { duration: 3000 })
    });
  }
}