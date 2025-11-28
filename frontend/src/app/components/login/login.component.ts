import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <div class="w-full max-w-md bg-gray-950 rounded-3xl shadow-2xl border-2 border-yellow-400/40 p-10 flex flex-col gap-8 animate-fade-in">
        <div class="flex flex-col items-center mb-2">
          <svg class="w-16 h-16 mb-2" fill="none" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#FFD600"/><path d="M32 18a10 10 0 0 1 10 10v2a10 10 0 0 1-20 0v-2a10 10 0 0 1 10-10z" fill="#23232b"/><path d="M22 40c0-3.314 4.477-6 10-6s10 2.686 10 6v2H22v-2z" fill="#23232b"/></svg>
          <h2 class="text-4xl font-extrabold text-yellow-400 text-center drop-shadow mb-1">Bem-vindo ao FitMatch</h2>
          <p class="text-gray-300 text-center text-base">Conecte-se e encontre seu time ideal!</p>
        </div>
        <form [formGroup]="form" (ngSubmit)="submit()" class="flex flex-col gap-5">
          <div>
            <label class="block text-sm font-semibold text-gray-200 mb-1">Email</label>
            <input formControlName="email" type="email" class="w-full px-4 py-2 rounded-xl bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition placeholder:text-gray-500" placeholder="Seu email" />
            <div *ngIf="form.get('email')?.invalid && form.get('email')?.touched" class="text-xs text-red-400 mt-1">Email inválido</div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-200 mb-1">Senha</label>
            <input formControlName="password" type="password" class="w-full px-4 py-2 rounded-xl bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition placeholder:text-gray-500" placeholder="Sua senha" />
            <div *ngIf="form.get('password')?.invalid && form.get('password')?.touched" class="text-xs text-red-400 mt-1">Senha obrigatória</div>
          </div>
          <button type="submit" [disabled]="form.invalid" class="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-gray-900 font-bold text-lg shadow-lg hover:scale-105 hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed">Entrar</button>
        </form>
        <div class="flex justify-center mt-2">
          <a routerLink="/register" class="text-yellow-400 hover:underline font-semibold text-base">Criar conta</a>
        </div>
      </div>
    </div>
  `,
  styles: [`.animate-fade-in { animation: fadeIn 0.7s ease; } @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }`]
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe({
        next: (res) => {
          this.router.navigate([res.user.type === 'player' ? '/teams' : '/players']);
        },
        error: (err) => {
          this.snackBar.open(err.error.error || 'Erro ao logar', 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}