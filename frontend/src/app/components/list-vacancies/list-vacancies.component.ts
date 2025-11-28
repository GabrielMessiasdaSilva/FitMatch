import { Component, OnInit } from '@angular/core';
import { VacanciesService } from '../../services/vacancies.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-vacancies',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black p-4 md:p-8">
      <div class="max-w-6xl mx-auto mt-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-extrabold text-amber-400 mb-3">Vagas Abertas</h1>
          <p class="text-gray-400 text-lg">Encontre oportunidades de jogo incríveis</p>
        </div>

        <!-- Mensagem vazio -->
        <div *ngIf="vagas.length === 0" class="text-center py-16">
          <p class="text-gray-400 text-xl">Nenhuma vaga disponível no momento.</p>
        </div>

        <!-- Grid de Vagas -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let vaga of vagas" class="bg-slate-800/50 backdrop-blur border border-amber-400/20 rounded-lg p-6 hover:border-amber-400/40 hover:shadow-lg transition-all duration-300 flex flex-col">
            <!-- Cabeçalho da vaga -->
            <div class="mb-4 pb-4 border-b border-amber-400/10">
              <div class="text-2xl font-bold text-amber-400 mb-2">{{ vaga.posicaoDesejada }}</div>
              <div class="text-sm text-gray-500">{{ vaga.sport || 'Esporte não informado' }}</div>
            </div>

            <!-- Detalhes -->
            <div class="flex-1 mb-6 space-y-3">
              <div class="flex items-start gap-3">
                <span class="font-bold text-amber-300 min-w-16">Data:</span>
                <span class="text-gray-300">{{ vaga.data || 'Não informada' }}</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="font-bold text-amber-300 min-w-16">Hora:</span>
                <span class="text-gray-300">{{ vaga.hora || 'Não informada' }}</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="font-bold text-amber-300 min-w-16">Local:</span>
                <span class="text-gray-300">{{ vaga.local || 'Não informado' }}</span>
              </div>
            </div>

            <!-- Botão -->
            <button
              (click)="acceptVaca(vaga.id)"
              [disabled]="loading"
              class="w-full px-4 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold shadow-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              {{ loading ? 'Processando...' : 'Aceitar Vaga' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ListVacanciesComponent implements OnInit {
  vagas: any[] = [];
  loading = false;
  userType: string | null = '';

  constructor(
    private vacancies: VacanciesService,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.userType = this.auth.getUserType();
  }

  ngOnInit(): void {
    this.loadVacancies();
  }

  loadVacancies() {
    this.vacancies.list({ status: 'open' }).subscribe({
      next: (data) => {
        this.vagas = data;
      },
      error: (err) => {
        this.snackBar.open('Erro ao carregar vagas', 'Fechar', { duration: 3000 });
      }
    });
  }

  acceptVaca(vagaId: string) {
    if (this.userType !== 'player') {
      this.snackBar.open('Apenas jogadores podem aceitar vagas', 'Ok', { duration: 2000 });
      return;
    }

    this.loading = true;
    this.vacancies.accept(vagaId).subscribe({
      next: () => {
        this.snackBar.open('Vaga aceita! Aguardando resposta do time.', 'Ok', { duration: 2500 });
        this.loadVacancies();
        this.loading = false;
      },
      error: (err) => {
        this.snackBar.open(err.error?.error || 'Erro ao aceitar vaga', 'Fechar', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
