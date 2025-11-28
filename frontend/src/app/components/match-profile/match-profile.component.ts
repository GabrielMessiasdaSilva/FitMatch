import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-match-profile',
  template: `
    <div class="rounded-xl border border-slate-700 shadow-lg p-6 flex flex-col items-center text-center" style="background: linear-gradient(135deg, #000000ff 0%, #272529ff 50%, #ffffffff 100%);">
      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-indigo-400 flex items-center justify-center text-2xl font-extrabold text-slate-900 mb-4">{{ name ? name.charAt(0).toUpperCase() : '?' }}</div>
      <div class="text-xl font-bold text-amber-400 mb-1">{{ name }}</div>
      <div class="text-sm text-slate-400 mb-2">{{ type === 'player' ? 'Jogador' : 'Time' }}</div>
      <div class="mb-2 text-slate-200" *ngIf="position"><b class="text-amber-300">Posição:</b> {{ position }}</div>
      <div class="mb-2 text-slate-200" *ngIf="neighborhood"><b class="text-amber-300">Bairro:</b> {{ neighborhood }}</div>
      <div class="mb-2 text-slate-200" *ngIf="sport"><b class="text-amber-300">Esporte:</b> {{ sport }}</div>
      <div class="mb-2 text-slate-200" *ngIf="age"><b class="text-amber-300">Idade:</b> {{ age }}</div>
      <div class="mb-2 text-slate-200" *ngIf="neededPositions"><b class="text-amber-300">Vagas:</b> {{ neededPositions }}</div>
      <button class="mt-4 px-6 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold shadow transition">Dar Match</button>
    </div>
  `
})
export class MatchProfileComponent {
  @Input() name?: string;
  @Input() type?: 'player' | 'team';
  @Input() position?: string;
  @Input() neighborhood?: string;
  @Input() sport?: string;
  @Input() age?: number;
  @Input() neededPositions?: string;
}
