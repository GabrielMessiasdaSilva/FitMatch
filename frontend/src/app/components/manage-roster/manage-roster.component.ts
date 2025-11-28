import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from '../../services/teams.service';
import { AuthService } from '../../services/auth.service';
import { MatchesService } from '../../services/matches.service';

interface PlayerInRoster {
  playerId: string;
  nome: string;
  posicao: string;
}

@Component({
  selector: 'app-manage-roster',
  templateUrl: './manage-roster.component.html',
  styleUrls: ['./manage-roster.component.scss']
})
export class ManageRosterComponent implements OnInit {
  teamId: string = '';
  teamData: any = null;
  roster: PlayerInRoster[] = [];
  candidates: any[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  positions = ['Goleiro', 'Defesa', 'Meio-Campo', 'Atacante'];
  editingPlayerId: string | null = null;
  editingPosition: string = '';

  constructor(
    private teamsService: TeamsService,
    private authService: AuthService,
    private router: Router,
    private matchesService: MatchesService
  ) {}

  ngOnInit(): void {
    this.teamId = this.authService.getUserId() || '';
    if (!this.teamId) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadTeamData();
  }

  private loadTeamData(): void {
    this.loading = true;
    this.teamsService.getTeamById(this.teamId).subscribe({
      next: (team) => {
        this.teamData = team;
        this.roster = team.roster || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar time:', err);
        this.errorMessage = 'Erro ao carregar dados do time.';
        this.loading = false;
      }
    });

    // Carregar candidaturas
    this.teamsService.getTeamWithPlayerCount(this.teamId).subscribe({
      next: (teamWithStats: any) => {
        this.candidates = teamWithStats.candidatos || [];
      },
      error: (err: any) => {
        console.error('Erro ao carregar candidatos:', err);
      }
    });
  }

  startEditPosition(playerId: string, currentPosition: string): void {
    this.editingPlayerId = playerId;
    this.editingPosition = currentPosition || '';
  }

  savePosition(playerId: string): void {
    if (!this.editingPosition) {
      this.errorMessage = 'Posição é obrigatória.';
      return;
    }

    this.loading = true;
    this.teamsService.manageRoster(this.teamId, playerId, 'update-position', this.editingPosition).subscribe({
      next: () => {
        // Atualizar localmente
        const player = this.roster.find(p => p.playerId === playerId);
        if (player) {
          player.posicao = this.editingPosition;
        }
        this.editingPlayerId = null;
        this.editingPosition = '';
        this.successMessage = 'Posição atualizada com sucesso!';
        this.loading = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        console.error('Erro ao atualizar posição:', err);
        this.errorMessage = 'Erro ao atualizar posição.';
        this.loading = false;
      }
    });
  }

  removePlayer(playerId: string): void {
    if (!confirm('Tem certeza que deseja remover este jogador?')) {
      return;
    }

    this.loading = true;
    this.teamsService.manageRoster(this.teamId, playerId, 'remove').subscribe({
      next: () => {
        this.roster = this.roster.filter(p => p.playerId !== playerId);
        this.successMessage = 'Jogador removido com sucesso!';
        this.loading = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        console.error('Erro ao remover jogador:', err);
        this.errorMessage = 'Erro ao remover jogador.';
        this.loading = false;
      }
    });
  }

  acceptCandidate(candidateId: string): void {
    if (!confirm('Aceitar este candidato e adicioná-lo ao elenco?')) return;
    this.loading = true;
    this.matchesService.respond(candidateId, 'accepted').subscribe({
      next: () => {
        this.successMessage = 'Candidato aceito e adicionado ao elenco.';
        this.loadTeamData();
        this.loading = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        console.error('Erro ao aceitar candidato:', err);
        this.errorMessage = err?.error?.error || 'Erro ao aceitar candidato.';
        this.loading = false;
      }
    });
  }

  rejectCandidate(candidateId: string): void {
    if (!confirm('Rejeitar este candidato?')) return;
    this.loading = true;
    this.matchesService.respond(candidateId, 'rejected').subscribe({
      next: () => {
        this.successMessage = 'Candidato rejeitado.';
        this.loadTeamData();
        this.loading = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        console.error('Erro ao rejeitar candidato:', err);
        this.errorMessage = err?.error?.error || 'Erro ao rejeitar candidato.';
        this.loading = false;
      }
    });
  }

  cancelEdit(): void {
    this.editingPlayerId = null;
    this.editingPosition = '';
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  get currentRosterCount(): number {
    return this.roster.length;
  }

  get maxPlayers(): number {
    return this.teamData?.maxJogadores || 0;
  }

  get rosterStatus(): string {
    if (this.maxPlayers === 0) {
      return `${this.currentRosterCount} jogadores`;
    }
    return `${this.currentRosterCount} / ${this.maxPlayers} jogadores`;
  }

  get rosterFull(): boolean {
    return this.maxPlayers > 0 && this.currentRosterCount >= this.maxPlayers;
  }
}
