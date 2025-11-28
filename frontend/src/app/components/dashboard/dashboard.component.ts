import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { TeamsService } from '../../services/teams.service';
import { MatchesService } from '../../services/matches.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-black text-slate-100">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="col-span-2">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-lg">
                <div class="text-sm text-slate-400">Jogadores cadastrados</div>
                <div class="text-3xl font-extrabold mt-2 text-amber-400">{{ playersCount }}</div>
                <div class="mt-3 text-sm text-slate-400">Últimos jogadores</div>
                <ul class="mt-2 space-y-2">
                  <li *ngFor="let p of recentPlayers" class="text-sm text-slate-100">{{ p.name }} — {{ p.position }}</li>
                </ul>
              </div>
              <div class="p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-lg">
                <div class="text-sm text-slate-400">Times cadastrados</div>
                <div class="text-3xl font-extrabold mt-2 text-amber-400">{{ teamsCount }}</div>
                <div class="mt-3 text-sm text-slate-400">Times com vagas</div>
                <ul class="mt-2 space-y-2">
                  <li *ngFor="let t of teamsWithVacancies" class="text-sm text-slate-100">{{ t.name }} — {{ t.neededPositions?.join(', ') }}</li>
                </ul>
              </div>
              <div class="p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-lg md:col-span-2">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm text-slate-400">Solicitações</div>
                    <div class="text-2xl font-extrabold text-amber-400">{{ matchesCount }}</div>
                  </div>
                  <div class="text-sm text-slate-400">Controle rápido</div>
                </div>
                <div class="mt-4">
                  <table class="w-full text-sm text-left">
                    <thead class="text-slate-400 text-xs uppercase">
                      <tr><th>ID</th><th>Tipo</th><th>Status</th></tr>
                    </thead>
                    <tbody class="mt-2">
                      <tr *ngFor="let m of recentMatches" class="border-t border-slate-700">
                        <td class="py-2">{{ m.id | slice:0:6 }}...</td>
                        <td class="py-2">{{ m.playerId ? 'Player' : 'Team' }}</td>
                        <td class="py-2"><span class="px-2 py-1 rounded-full text-xs" [ngClass]="statusClass(m.status)">{{ m.status }}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="mt-8">
                  <canvas id="dashboardChart" height="80"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-slate-800 rounded-lg border border-slate-700 shadow-lg p-4">
            <div class="text-sm text-slate-400">Ações Rápidas</div>
            <div class="mt-4 flex flex-col gap-3">
              <button (click)="goTo('players')" class="py-2 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold">Encontrar Jogadores</button>
              <button (click)="goTo('teams')" class="py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">Criar Time</button>
              <button (click)="goTo('matches')" class="py-2 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold">Ver Candidaturas</button>
            </div>
            <div class="mt-8">
              <div class="text-xs text-slate-400 mb-2">Notificações recentes</div>
              <ul class="space-y-2">
                <li *ngFor="let m of recentMatches" class="text-sm text-slate-100">Solicitação <b>{{ m.status }}</b> para {{ m.playerId ? 'Player' : 'Team' }} <span class="text-amber-400">({{ m.id | slice:0:6 }})</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  playersCount = 0;
  teamsCount = 0;
  matchesCount = 0;
  recentPlayers: any[] = [];
  teamsWithVacancies: any[] = [];
  recentMatches: any[] = [];

  constructor(
    private playersService: PlayersService,
    private teamsService: TeamsService,
    private matchesService: MatchesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.playersService.getPlayers({}).subscribe(data => { this.playersCount = data.length; this.recentPlayers = data.slice(0,5); });
    this.teamsService.getTeams({}).subscribe(data => { this.teamsCount = data.length; this.teamsWithVacancies = data.filter((t:any)=>t.neededPositions && t.neededPositions.length>0).slice(0,5); });
    this.matchesService.getAll().subscribe(data => { this.matchesCount = data.length; this.recentMatches = data.slice(0,6); this.renderChart(); });
  }

  goTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  statusClass(status: string) {
    switch(status) {
      case 'pending': return 'bg-yellow-300 text-black';
      case 'accepted': return 'bg-green-500 text-white';
      case 'rejected': return 'bg-red-500 text-white';
      default: return 'bg-blue-100 text-blue-700';
    }
  }

  renderChart() {
    if ((window as any).Chart) {
      const ctx = (document.getElementById('dashboardChart') as HTMLCanvasElement)?.getContext('2d');
      if (!ctx) return;
      const statusCounts: { [key: string]: number } = { pending: 0, accepted: 0, rejected: 0 };
      this.recentMatches.forEach(m => {
        if (['pending', 'accepted', 'rejected'].includes(m.status)) {
          statusCounts[m.status] = (statusCounts[m.status] || 0) + 1;
        }
      });
      new (window as any).Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Pendente', 'Aceito', 'Recusado'],
          datasets: [{
            label: 'Solicitações',
            data: [statusCounts['pending'], statusCounts['accepted'], statusCounts['rejected']],
            backgroundColor: ['#fde047', '#22c55e', '#ef4444'],
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }
  }
}
