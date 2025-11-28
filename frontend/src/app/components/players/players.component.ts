import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { TeamsService } from '../../services/teams.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-players',
  template: `
    <div class="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-black text-slate-100">
      <div class="max-w-6xl mx-auto">
        <div *ngIf="userType !== 'team'" class="text-center py-24">
          <h2 class="text-2xl font-bold text-amber-400 mb-4">Acesso restrito</h2>
          <p class="text-slate-400 text-lg">A busca de jogadores só pode ser feita por times.</p>
        </div>
        <div *ngIf="userType === 'team'">
          <div class="text-center mb-8">
            <h1 class="text-3xl md:text-4xl font-extrabold text-amber-400 mb-2">Encontrar Jogadores</h1>
            <p class="text-slate-400 text-lg">Filtre e encontre atletas perto de você</p>
          </div>
          <form class="flex flex-wrap gap-4 mb-10 items-end bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg" [formGroup]="filterForm">
            <div class="flex-1 min-w-[180px]">
              <label class="block text-sm font-semibold mb-1 text-amber-300">Posição</label>
              <input formControlName="position" class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Ex: Atacante" />
            </div>
            <div class="flex-1 min-w-[180px]">
              <label class="block text-sm font-semibold mb-1 text-amber-300">Bairro</label>
              <input formControlName="neighborhood" class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Ex: Mooca" />
            </div>
            <div class="flex-1 min-w-[180px]">
              <label class="block text-sm font-semibold mb-1 text-amber-300">Esporte</label>
              <input formControlName="sport" class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Ex: Futebol" />
            </div>
            <button type="button" (click)="loadPlayers()" class="px-6 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold shadow transition">Filtrar</button>
          </form>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let player of players" class="bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-xl border border-slate-700 shadow-lg p-0 flex flex-col hover:scale-[1.03] transition">
              <div class="flex items-center gap-4 p-5 border-b border-slate-700">
                <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400 to-indigo-400 flex items-center justify-center text-xl font-extrabold text-slate-900">{{ player.nome?.charAt(0).toUpperCase() }}</div>
                <div>
                  <div class="text-lg font-bold text-amber-400">{{ player.nome }}</div>
                  <div class="text-xs text-slate-400">{{ player.neighborhood }}</div>
                </div>
              </div>
              <div class="p-5 flex-1">
                <div class="mb-2 text-sm"><span class="font-bold text-amber-300">Posição:</span> <span class="text-slate-100">{{ player.posicao }}</span></div>
                <div class="mb-2 text-sm"><span class="font-bold text-amber-300">Esportes:</span> <span class="text-slate-100">{{ player.sports ? player.sports.join(', ') : (player.esportes ? player.esportes.join(', ') : '') }}</span></div>
                <div class="text-sm"><span class="font-bold text-amber-300">Idade:</span> <span class="text-slate-100">{{ player.idade }}</span></div>
              </div>
              <div class="p-5 border-t border-slate-700 flex justify-end">
                <button *ngIf="userType === 'team'" (click)="invitePlayer(player.id)" class="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold shadow transition flex items-center gap-2">
                  <span class="material-icons text-base">send</span> Convidar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
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
    this.filterForm.valueChanges.subscribe(() => {
      this.loadPlayers();
    });
    this.loadPlayers();
  }

  loadPlayers() {
    const filters = { ...this.filterForm.value };
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