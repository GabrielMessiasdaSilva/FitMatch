import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VacanciesService } from '../../services/vacancies.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish-vacancy',
  template: `
    <div class="min-h-screen flex items-center justify-center" style="background: linear-gradient(135deg, #000000ff 0%, #272529ff 50%, #222121ff 100%);">
      <div class="w-full max-w-md bg-black/40 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 p-10 flex flex-col gap-8 animate-fade-in">
        <div class="flex flex-col items-center mb-2">
          <svg class="w-14 h-14 mb-2" fill="none" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#FFD600"/><path d="M32 18a10 10 0 0 1 10 10v2a10 10 0 0 1-20 0v-2a10 10 0 0 1 10-10z" fill="#23232b"/><path d="M22 40c0-3.314 4.477-6 10-6s10 2.686 10 6v2H22v-2z" fill="#23232b"/></svg>
          <h2 class="text-3xl font-extrabold text-amber-400 text-center drop-shadow mb-1">Publicar Vaga</h2>
          <p class="text-gray-300 text-center text-base">Divulgue oportunidades para jogadores no seu time!</p>
        </div>
        <form [formGroup]="form" (ngSubmit)="submit()" class="flex flex-col gap-5">
          <div>
            <label class="block text-sm font-semibold text-amber-300 mb-1">Esporte</label>
            <input formControlName="sport" class="w-full px-5 py-3 rounded-xl bg-black/50 text-slate-100 border border-white/10 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition placeholder:text-slate-600" placeholder="Ex: Futebol" />
            <div *ngIf="form.get('sport')?.invalid && form.get('sport')?.touched" class="text-xs text-red-400 mt-1">Campo obrigatório</div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-amber-300 mb-1">Posição</label>
            <input formControlName="position" class="w-full px-5 py-3 rounded-xl bg-black/50 text-slate-100 border border-white/10 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition placeholder:text-slate-600" placeholder="Ex: Atacante" />
            <div *ngIf="form.get('position')?.invalid && form.get('position')?.touched" class="text-xs text-red-400 mt-1">Campo obrigatório</div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-amber-300 mb-1">Data</label>
            <input formControlName="date" type="date" class="w-full px-5 py-3 rounded-xl bg-black/50 text-slate-100 border border-white/10 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition placeholder:text-slate-600" />
            <div *ngIf="form.get('date')?.invalid && form.get('date')?.touched" class="text-xs text-red-400 mt-1">Campo obrigatório</div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-amber-300 mb-1">Horário</label>
            <input formControlName="time" type="time" class="w-full px-5 py-3 rounded-xl bg-black/50 text-slate-100 border border-white/10 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition placeholder:text-slate-600" />
            <div *ngIf="form.get('time')?.invalid && form.get('time')?.touched" class="text-xs text-red-400 mt-1">Campo obrigatório</div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-amber-300 mb-1">Local</label>
            <input formControlName="local" type="text" class="w-full px-5 py-3 rounded-xl bg-black/50 text-slate-100 border border-white/10 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition placeholder:text-slate-600" placeholder="Ex: Estádio Municipal" />
            <div *ngIf="form.get('local')?.invalid && form.get('local')?.touched" class="text-xs text-red-400 mt-1">Campo obrigatório</div>
          </div>
          <button type="submit" [disabled]="form.invalid" class="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-gray-900 font-bold text-lg shadow-lg hover:scale-105 hover:bg-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed">Publicar Vaga</button>
        </form>
      </div>
    </div>
  `,
  styles: [`.animate-fade-in { animation: fadeIn 0.7s ease; } @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }`]
})
export class PublishVacancyComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vacancies: VacanciesService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      sport: ['', Validators.required],
      position: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      local: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const payload = {
        sport: this.form.value.sport,
        posicaoDesejada: this.form.value.position,
        data: this.form.value.date,
        hora: this.form.value.time,
        local: this.form.value.local
      };

      this.vacancies.create(payload).subscribe({
        next: () => {
          this.snackBar.open('Vaga publicada com sucesso!', 'Ok', { duration: 2500 });
          this.form.reset();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.snackBar.open(err.error?.error || 'Erro ao publicar vaga', 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}
