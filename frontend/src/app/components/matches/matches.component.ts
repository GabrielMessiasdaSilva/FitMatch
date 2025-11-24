import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../../services/matches.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-matches',
  template: `
    <div class="page">

      <div class="header">
        <h1>🔥 Central de Matchmaking</h1>
        <p>Gerencie suas solicitações com estilo.</p>
      </div>

      <mat-card class="glass-card">
        
        <table mat-table [dataSource]="matches" class="full-width-table">

          <!-- ID -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let element">
              <span class="code">{{ element.id | slice:0:6 }}...</span>
            </td>
          </ng-container>

          <!-- Info -->
          <ng-container matColumnDef="info">
            <th mat-header-cell *matHeaderCellDef>Informações</th>
            <td mat-cell *matCellDef="let element">
              <div class="info-box">
                <span *ngIf="userType === 'player'">🏆 Time ID: {{element.teamId}}</span>
                <span *ngIf="userType === 'team'">⚽ Jogador ID: {{element.playerId}}</span>
              </div>
            </td>
          </ng-container>

          <!-- Status -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let element">
              <span class="status" [ngClass]="element.status">
                {{ element.status | uppercase }}
              </span>
            </td>
          </ng-container>

          <!-- Ações -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Ações</th>
            <td mat-cell *matCellDef="let element">

              <div class="action-area" *ngIf="userType === 'team' && element.status === 'pending'">
                <button mat-icon-button color="primary" (click)="respond(element.id, 'accepted')">
                  <mat-icon>check_circle</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="respond(element.id, 'rejected')">
                  <mat-icon>cancel</mat-icon>
                </button>
              </div>

              <span *ngIf="userType === 'player' || element.status !== 'pending'" class="dash">—</span>

            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns" class="row"></tr>

        </table>

      </mat-card>

    </div>
  `,
  styles: [`
/* ====== Página ====== */
.page {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeIn .5s ease-in-out;
}

/* ====== Header ====== */
.header {
  text-align: center;
}

.header h1 {
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(90deg, #ff007f, #7f00ff);
  -webkit-background-clip: text;
  color: transparent;
}

.header p {
  color: #666;
  margin-top: 4px;
  font-size: 15px;
}

/* ====== Cartão principal ====== */
.glass-card {
  padding: 0;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255,255,255,0.17);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.25);
  color: #111 !important; /* Texto visível */
}

.full-width-table {
  width: 100%;
}

/* ===== Cabeçalho e células da tabela ===== */
.full-width-table td,
.full-width-table th {
  color: #111 !important;
  font-size: 14px;
}

/* ===== Linha da tabela ===== */
.row:hover {
  background: rgba(0,0,0,0.08);
  cursor: pointer;
}

/* ===== Código curto do ID ===== */
.code {
  font-family: monospace;
  padding: 4px 8px;
  background: #222;
  color: #e2e2e2;
  border-radius: 6px;
  font-size: 13px;
}

/* ===== Informações ===== */
.info-box {
  padding: 6px 12px;
  background: #f4f4f4;
  color: #222 !important;
  border-radius: 8px;
  font-weight: 500;
}

/* ===== Status ===== */
.status {
  padding: 6px 12px;
  border-radius: 20px;
  color: #352a2aff;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.pending {
  background: #ffca28;
  color: #222 !important;
}

.accepted {
  background: #43a047;
}

.rejected {
  background: #e53935;
}

/* ===== Botões ===== */
.action-area button {
  margin-right: 6px;
}

.dash {
  color: #999;
}

/* ===== Animação ===== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to   { opacity: 1; transform: translateY(0); }
}

  `]
})
export class MatchesComponent implements OnInit {
  matches: any[] = [];
  displayedColumns: string[] = ['id', 'info', 'status', 'actions'];
  userType: string | null = '';

  constructor(
    private matchesService: MatchesService,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.userType = this.auth.getUserType();
  }

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches() {
    this.matchesService.getMyMatches().subscribe(data => {
      this.matches = data;
    });
  }

  respond(matchId: string, status: 'accepted' | 'rejected') {
    this.matchesService.respond(matchId, status).subscribe({
      next: () => {
        this.snackBar.open(`Solicitação ${status}!`, 'Ok', { duration: 2000 });
        this.loadMatches();
      },
      error: () => this.snackBar.open('Erro ao responder', 'Fechar')
    });
  }
}
