import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { JogosService } from '../../services/jogos.service';
import { AvaliacoesService } from '../../services/avaliacoes.service';
import { AuthService } from '../../services/auth.service';
import { EventsService } from '../../services/events.service';
import { Subscription } from 'rxjs';

interface Game {
  id: string;
  data: string;
  local: string;
  timeId: string;
  nomeTime?: string;
  avaliacoes?: any[];
  ratingMedio?: number;
}

@Component({
  selector: 'app-history-games',
  templateUrl: './history-games.component.html',
  styleUrls: ['./history-games.component.scss']
})
export class HistoryGamesComponent implements OnInit {
  games: Game[] = [];
  loading = false;
  errorMessage = '';
  usuarioId: string = '';
  private eventsSub: Subscription | null = null;
  newEvalNotification = false;

  constructor(
    private jogosService: JogosService,
    private avaliacoesService: AvaliacoesService,
    private authService: AuthService,
    private router: Router
    , private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.authService.getUserId() || '';
    this.loadGameHistory();
    // Inscrever para atualizações de avaliações (atualiza automaticamente o histórico)
    this.eventsSub = this.eventsService.on('avaliacoes-updated').subscribe(() => {
      // mostrar notificação rápida e recarregar histórico
      this.newEvalNotification = true;
      setTimeout(() => this.newEvalNotification = false, 3500);
      this.loadGameHistory();
    });
  }

  ngOnDestroy(): void {
    if (this.eventsSub) this.eventsSub.unsubscribe();
  }

  private loadGameHistory(): void {
    this.loading = true;
    this.jogosService.getMyGames().subscribe({
      next: (games: any[]) => {
        this.games = games;
        // Carregar avaliações para cada jogo
        this.games.forEach(game => {
          this.avaliacoesService.getAvaliacoesByGame(game.id).subscribe({
            next: (avaliacoes: any[]) => {
              game.avaliacoes = avaliacoes;
              game.ratingMedio = this.calcularMediaRating(avaliacoes);
            },
            error: (err: any) => console.error('Erro ao carregar avaliações:', err)
          });
        });
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar histórico:', err);
        this.errorMessage = 'Erro ao carregar histórico de jogos.';
        this.loading = false;
      }
    });
  }

  private calcularMediaRating(avaliacoes: any[]): number {
    if (!avaliacoes || avaliacoes.length === 0) return 0;
    const soma = avaliacoes.reduce((s, a) => s + (a.nota || 0), 0);
    return soma / avaliacoes.length;
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  get estatisticas() {
    return {
      totalJogos: this.games.length,
      ratingMedio: this.games.length > 0 
        ? (this.games.reduce((s, g) => s + (g.ratingMedio || 0), 0) / this.games.length).toFixed(1)
        : 0
    };
  }
}
