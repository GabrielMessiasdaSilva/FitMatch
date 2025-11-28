import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-game-monitor',
  template: `
    <div class="max-w-2xl mx-auto bg-white rounded-xl border border-blue-100 shadow-lg p-8 mt-8">
      <h2 class="text-2xl font-extrabold text-blue-700 mb-6 text-center">Monitoramento Pós-Jogo</h2>
      <div *ngIf="game">
        <div class="mb-4 text-blue-900"><b>Time:</b> {{ game.team }}</div>
        <div class="mb-4 text-blue-900"><b>Jogadores:</b> {{ game.players?.join(', ') }}</div>
        <div class="mb-4 text-blue-900"><b>Resultado:</b> {{ game.result }}</div>
        <div class="mb-4 text-blue-900"><b>Feedback:</b> {{ game.feedback }}</div>
      </div>
      <div *ngIf="!game" class="text-blue-400 text-center">Selecione um jogo para monitorar.</div>
    </div>
  `
})
export class PostGameMonitorComponent {
  @Input() game: any;
}
