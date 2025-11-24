import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Login FITMATCH</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="submit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Senha</mat-label>
              <input matInput formControlName="password" type="password">
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">ENTRAR</button>
          </form>
        </mat-card-content>
        <mat-card-actions>
            <a routerLink="/register" mat-button>Criar conta</a>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container { display: flex; justify-content: center; align-items: center; height: 80vh; }
    .login-card { width: 400px; padding: 20px; }
    .full-width { width: 100%; margin-bottom: 10px; }
    button { width: 100%; }
  `]
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