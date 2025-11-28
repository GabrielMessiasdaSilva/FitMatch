import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JogosService } from '../../services/jogos.service';
import { AvaliacoesService } from '../../services/avaliacoes.service';
import { PlayersService } from '../../services/players.service';
import { firstValueFrom } from 'rxjs';
import { EventsService } from '../../services/events.service';

interface Jogador {
  id: string;
  nome: string;
  nota?: number;
  comentario?: string;
  evaluated?: boolean;
  existingAvaliacao?: any;
}

@Component({
  selector: 'app-evaluate-players',
  templateUrl: './evaluate-players.component.html',
  styleUrls: ['./evaluate-players.component.scss']
})
export class EvaluatePlayersComponent implements OnInit {
  gameId: string = '';
  jogadores: Jogador[] = [];
  loading = false;
  submitting = false;
  errorMessage = '';
  successMessage = '';
  forms: Map<string, FormGroup> = new Map();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jogosService: JogosService,
    private avaliacoesService: AvaliacoesService,
    private playersService: PlayersService
    , private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      this.loadGame();
    });
  }

  private loadGame(): void {
    this.loading = true;
    this.jogosService.getGameById(this.gameId).subscribe({
      next: async (game: any) => {
        if (game && game.jogadoresPresentes) {
          // Buscar dados reais dos jogadores via PlayersService
          const players = [] as Jogador[];
          for (const id of game.jogadoresPresentes) {
            try {
              const p: any = await firstValueFrom(this.playersService.getPlayerById(id));
              players.push({
                id,
                nome: p?.nome || p?.usuario?.nome || `Jogador ${id.substring(0,5)}`,
                nota: 5,
                comentario: '',
                evaluated: false
              });
            } catch (e) {
              players.push({ id, nome: `Jogador ${id.substring(0,5)}`, nota: 5, comentario: '', evaluated: false });
            }
          }
          this.jogadores = players;

          // Criar formulários para cada jogador
          this.jogadores.forEach(jogador => {
            const form = this.fb.group({
              nota: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
              comentario: ['', [Validators.required, Validators.minLength(5)]]
            });
            this.forms.set(jogador.id, form);
          });

          // Carregar avaliações já existentes para este jogo e marcar jogadores avaliados
          this.avaliacoesService.getAvaliacoesByGame(this.gameId).subscribe({
            next: (avaliacoes: any[]) => {
              avaliacoes.forEach(av => {
                const j = this.jogadores.find(x => x.id === av.jogadorId);
                if (j) {
                  j.evaluated = true;
                  (j as any).existingAvaliacao = av;
                  const f = this.getForm(j.id);
                  if (f) {
                    f.patchValue({ nota: av.nota, comentario: av.comentario });
                  }
                }
              });
            },
            error: (err: any) => console.error('Erro ao buscar avaliações existentes:', err)
          });
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar jogo:', err);
        this.errorMessage = 'Erro ao carregar detalhes do jogo.';
        this.loading = false;
      }
    });
  }

  getForm(jogadorId: string): FormGroup | undefined {
    return this.forms.get(jogadorId);
  }

  submitAvaliacao(jogador: Jogador): void {
    const form = this.getForm(jogador.id);
    if (!form || !form.valid) {
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
      return;
    }

    const avaliacao = {
      jogadorId: jogador.id,
      jogoId: this.gameId,
      nota: form.value.nota,
      comentario: form.value.comentario
    };

    this.avaliacoesService.createAvaliacao(avaliacao).subscribe({
      next: () => {
        jogador.evaluated = true;
        this.successMessage = `Avaliação de ${jogador.nome} registrada com sucesso!`;
        // Notificar outros componentes (ex: histórico)
        this.eventsService.emit('avaliacoes-updated', { jogoId: this.gameId, jogadorId: jogador.id });
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err: any) => {
        console.error('Erro ao avaliar jogador:', err);
        this.errorMessage = `Erro ao avaliar ${jogador.nome}. Tente novamente.`;
      }
    });
  }

  submitAll(): void {
    // Somente considerar jogadores que ainda não foram avaliados
    const novos = this.jogadores.filter(j => !j.evaluated);
    if (novos.length === 0) {
      this.errorMessage = 'Nenhuma avaliação nova para registrar.';
      return;
    }

    const formsInvalid = novos.map(j => this.getForm(j.id)).some(f => !f || !f.valid);
    if (formsInvalid) {
      this.errorMessage = 'Preencha todas as avaliações com dados válidos.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const avaliacoes = novos.map(jogador => {
      const form = this.getForm(jogador.id)!;
      return {
        jogadorId: jogador.id,
        jogoId: this.gameId,
        nota: form.value.nota,
        comentario: form.value.comentario
      };
    });

    let completed = 0;
    avaliacoes.forEach(avaliacao => {
      this.avaliacoesService.createAvaliacao(avaliacao).subscribe({
        next: () => {
          // marcar jogador como avaliado localmente
          const j = this.jogadores.find(x => x.id === avaliacao.jogadorId);
          if (j) j.evaluated = true;
          completed++;
          if (completed === avaliacoes.length) {
            this.successMessage = 'Todas as avaliações foram registradas com sucesso!';
            this.submitting = false;
            // Notificar e voltar ao dashboard
            this.eventsService.emit('avaliacoes-updated', { jogoId: this.gameId });
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 1500);
          }
        },
        error: (err: any) => {
          console.error('Erro:', err);
          this.errorMessage = 'Erro ao registrar avaliações. Tente novamente.';
          this.submitting = false;
        }
      });
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  get allEvaluated(): boolean {
    return this.jogadores.every(j => j.evaluated);
  }

  get evaluatedCount(): number {
    return this.jogadores.filter(j => j.evaluated).length;
  }
}
