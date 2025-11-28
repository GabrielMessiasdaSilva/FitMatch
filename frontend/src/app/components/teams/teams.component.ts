import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { MatchesService } from '../../services/matches.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-teams',
  template: `
    <div class="min-h-screen p-6 text-gray-100" style="background: linear-gradient(135deg, #000000ff 0%, #272529ff 50%, #ffffffff 100%);">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-extrabold mb-6 text-amber-400">Encontrar Times</h2>
        <form class="flex flex-wrap gap-4 mb-8 items-end p-4 rounded-xl border border-slate-700 shadow-lg" [formGroup]="filterForm" style="background: linear-gradient(135deg, #000000ff 0%, #000000ff 50%, #000000ff 100%);">
          <div class="flex-1 min-w-[220px]">
            <label class="block text-sm font-semibold mb-1 text-amber-300">Bairro</label>
            <input formControlName="neighborhood" class="w-full px-5 py-3 rounded-xl bg-black/50 text-slate-100 border border-white/10 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition placeholder:text-slate-600" placeholder="Digite o bairro" />
          </div>
          <div class="flex-1 min-w-[220px]">
            <label class="block text-sm font-semibold mb-1 text-amber-300">Esporte</label>
            <input formControlName="sport" class="w-full px-5 py-3 rounded-xl bg-black/50 text-slate-100 border border-white/10 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition placeholder:text-slate-600" placeholder="Digite o esporte" />
          </div>
          <button type="button" (click)="loadTeams()" class="px-6 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold shadow transition">Filtrar</button>
        </form>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let team of teams" class="rounded-xl border border-slate-700 shadow-lg p-0 flex flex-col" style="background: linear-gradient(135deg, #000000ff 0%, #0a0a0aff 50%, #000000ff 100%);">
            <div class="flex items-center gap-4 p-5 border-b border-slate-700">
              <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400 to-indigo-400 flex items-center justify-center text-xl font-extrabold text-slate-900">{{team.name?.charAt(0)}}</div>
              <div>
                <div class="text-lg font-bold text-amber-400">{{team.name || 'Sem Nome'}}</div>
                <div class="text-xs text-slate-400">{{team.sport}} - {{team.neighborhood}}</div>
              </div>
            </div>
            <div class="p-5 flex-1">
              <div class="mb-2 text-sm"><span class="font-bold text-amber-300">Vagas:</span> <span class="text-slate-100">{{team.neededPositions?.join(', ') || 'Nenhuma'}}</span></div>
              <div class="text-sm"><span class="font-bold text-indigo-300">Elenco:</span> <span class="text-slate-100">{{team.roster?.length || 0}} jogadores</span></div>
            </div>
            <div class="p-5 border-t border-slate-700 flex justify-end">
              <button *ngIf="userType === 'player'" (click)="apply(team.id)" class="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold shadow transition">Candidatar-se</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TeamsComponent implements OnInit {
  teams: any[] = [];
  filterForm: FormGroup;
  userType: string | null = '';

  constructor(
    private teamsService: TeamsService,
    private matchesService: MatchesService,
    private fb: FormBuilder,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.userType = this.auth.getUserType();
    this.filterForm = this.fb.group({
      neighborhood: [''],
      sport: ['']
    });
  }

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    const filters = this.filterForm.value;
    Object.keys(filters).forEach(key => filters[key] === '' && delete filters[key]);

    this.teamsService.getTeams(filters).subscribe(data => {
      this.teams = data;
    });
  }

  apply(teamId: string) {
    this.matchesService.apply(teamId).subscribe({
      next: () => this.snackBar.open('Candidatura enviada com sucesso!', 'Ok', { duration: 3000 }),
      error: (err) => this.snackBar.open(err.error.error || 'Erro ao aplicar', 'Fechar', { duration: 3000 })
    });
  }
}