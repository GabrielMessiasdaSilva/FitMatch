import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-publish-vacancy',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <div class="w-full max-w-lg bg-gray-950 rounded-3xl shadow-2xl border-2 border-amber-400/40 p-10 flex flex-col gap-8 animate-fade-in">
        <div class="flex flex-col items-center mb-2">
          <svg class="w-14 h-14 mb-2" fill="none" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#FFD600"/><path d="M32 18a10 10 0 0 1 10 10v2a10 10 0 0 1-20 0v-2a10 10 0 0 1 10-10z" fill="#23232b"/><path d="M22 40c0-3.314 4.477-6 10-6s10 2.686 10 6v2H22v-2z" fill="#23232b"/></svg>
          <h2 class="text-3xl font-extrabold text-amber-400 text-center drop-shadow mb-1">Publicar Vaga</h2>
          <p class="text-gray-300 text-center text-base">Divulgue oportunidades para jogadores no seu time!</p>
        </div>
        <form [formGroup]="form" (ngSubmit)="submit()" class="flex flex-col gap-5">
          <div>
            <label class="block text-sm font-semibold text-amber-300 mb-1">Esporte</label>
            <input formControlName="sport" class="w-full px-4 py-2 rounded-xl bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition placeholder:text-gray-500" placeholder="Ex: Futebol" />
            <div *ngIf="form.get('sport')?.invalid && form.get('sport')?.touched" class="text-xs text-red-400 mt-1">Campo obrigatório</div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-amber-300 mb-1">Posição</label>
            <input formControlName="position" class="w-full px-4 py-2 rounded-xl bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition placeholder:text-gray-500" placeholder="Ex: Atacante" />
            <div *ngIf="form.get('position')?.invalid && form.get('position')?.touched" class="text-xs text-red-400 mt-1">Campo obrigatório</div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-amber-300 mb-1">Horário</label>
            <input formControlName="time" type="time" class="w-full px-4 py-2 rounded-xl bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition placeholder:text-gray-500" />
            <div *ngIf="form.get('time')?.invalid && form.get('time')?.touched" class="text-xs text-red-400 mt-1">Campo obrigatório</div>
          </div>
          <button type="submit" [disabled]="form.invalid" class="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-gray-900 font-bold text-lg shadow-lg hover:scale-105 hover:bg-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed">Publicar Vaga</button>
        </form>
      </div>
    </div>
  `,
  styles: [`.animate-fade-in { animation: fadeIn 0.7s ease; } @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }`]
})
export class PublishVacancyComponent {
  @Output() vacancyPublished = new EventEmitter<any>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      sport: ['', Validators.required],
      position: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.vacancyPublished.emit(this.form.value);
      this.form.reset();
    }
  }
}
