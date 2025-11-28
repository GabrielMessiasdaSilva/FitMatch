import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JogosService } from '../../services/jogos.service';
import { TeamsService } from '../../services/teams.service';
import { AuthService } from '../../services/auth.service';

interface Candidato {
  id: string;
  jogadorId: string;
  nome: string;
  posicao: string;
  idade: number;
  checked?: boolean;
}

@Component({
  selector: 'app-register-game',
  templateUrl: './register-game.component.html',
  styleUrls: ['./register-game.component.scss']
})
export class RegisterGameComponent implements OnInit {
  gameForm: FormGroup;
  candidatos: Candidato[] = [];
  loading = false;
  submitting = false;
  errorMessage = '';
  successMessage = '';
  teamId: string = '';

  constructor(
    private fb: FormBuilder,
    private jogosService: JogosService,
    private teamsService: TeamsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.gameForm = this.fb.group({
      data: ['', Validators.required],
      local: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.teamId = this.authService.getUserId() || '';
    this.loadCandidatos();
  }

  private loadCandidatos(): void {
    this.loading = true;
    this.teamsService.getMyTeam().subscribe({
      next: (team: any) => {
        // Usar rosterPlayers (jogadores aceitos) em vez de candidatos (pendentes)
        if (team.rosterPlayers && team.rosterPlayers.length > 0) {
          this.candidatos = team.rosterPlayers.map((player: any) => ({
            ...player,
            checked: false
          }));
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar jogadores:', err);
        this.errorMessage = 'Erro ao carregar jogadores do roster.';
        this.loading = false;
      }
    });
  }

  toggleCandidato(candidato: Candidato): void {
    candidato.checked = !candidato.checked;
  }

  onSubmit(): void {
    if (!this.gameForm.valid) {
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
      return;
    }

    const selectedPlayers = this.candidatos
      .filter(c => c.checked)
      .map(c => c.jogadorId);

    if (selectedPlayers.length === 0) {
      this.errorMessage = 'Selecione pelo menos um jogador.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const gameData = {
      ...this.gameForm.value,
      jogadoresPresentes: selectedPlayers
    };

    this.jogosService.createGame(gameData).subscribe({
      next: (result: any) => {
        this.successMessage = 'Jogo registrado com sucesso!';
        this.gameForm.reset();
        this.candidatos.forEach(c => c.checked = false);
        this.submitting = false;
        
        // Redireciona para a tela de avaliação do jogo recém-criado
        setTimeout(() => {
          if (result && result.id) {
            this.router.navigate([`/avaliar-jogadores/${result.id}`]);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }, 800);
      },
      error: (err: any) => {
        console.error('Erro ao registrar jogo:', err);
        this.errorMessage = err.error?.error || 'Erro ao registrar jogo. Tente novamente.';
        this.submitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  get selectedCount(): number {
    return this.candidatos.filter(c => c.checked).length;
  }
}
