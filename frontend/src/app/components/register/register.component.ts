import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  template: `
    <div class="register-page fade-in">
      
      <div class="title-area">
        <h1>Crie sua conta</h1>
        <p>Entre para o FITMATCH e ache seu time ideal.</p>
      </div>

      <mat-card class="form-card glass">

        <mat-card-title class="form-title">
          ✨ Cadastro FITMATCH
        </mat-card-title>

        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="submit()">

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Tipo de Conta</mat-label>
              <mat-select formControlName="type">
                <mat-option value="player">Jogador</mat-option>
                <mat-option value="team">Time</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" autocomplete="off">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Senha</mat-label>
              <input matInput formControlName="password" type="password">
            </mat-form-field>

            <button mat-raised-button color="primary" class="submit-btn" [disabled]="form.invalid">
              Criar Conta
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions class="actions">
          <a routerLink="/login" class="login-link">Já tenho conta</a>
        </mat-card-actions>

      </mat-card>

    </div>
  `,
  styles: [`

    /* ====== PÁGINA ====== */
    .register-page {
      height: 92vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: linear-gradient(135deg, #0e0e0e, #1a1a1a 50%, #141414);
    }

    /* ====== TÍTULO ====== */
    .title-area {
      text-align: center;
      margin-bottom: 20px;
    }

    .title-area h1 {
      margin: 0;
      font-size: 2.4rem;
      font-weight: 800;
      background: linear-gradient(90deg, #FFD600, #FF0066);
      -webkit-background-clip: text;
      color: transparent;
    }

    .title-area p {
      margin-top: 6px;
      color: #ccc;
      font-size: 15px;
    }

    /* ====== CARD DO FORM ====== */
    .form-card {
      width: 400px;
      padding: 26px;
      border-radius: 18px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    }

    /* Efeito glass */
    .glass {
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.12);
      backdrop-filter: blur(12px);
    }

    .form-title {
      text-align: center;
      font-weight: 700;
      font-size: 1.3rem;
      margin-bottom: 14px;
      color: #fff;
    }

    /* ====== INPUTS ====== */
    .full-width {
      width: 100%;
      margin-bottom: 14px;
    }

    mat-form-field {
      color: #fff !important;
    }

    /* ====== BOTÃO ====== */
    .submit-btn {
      width: 100%;
      padding: 10px 0;
      font-weight: 700;
      letter-spacing: 1px;
      border-radius: 10px;
      font-size: 15px;
      background: linear-gradient(90deg, #009739, #00c851);
      color: white;
      transition: 0.25s;
    }

    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(0,255,100,0.35);
    }

    /* ====== LINK LOGIN ====== */
    .actions {
      justify-content: center;
      padding-top: 8px;
    }

    .login-link {
      color: #FFD600;
      font-weight: 600;
      text-decoration: none;
      transition: 0.2s;
    }

    .login-link:hover {
      text-decoration: underline;
    }

    /* ====== ANIMAÇÃO ====== */
    .fade-in {
      animation: fadeIn .5s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

  `]
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      type: ['player', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.form.valid) {
      this.auth.register(this.form.value).subscribe({
        next: () => {
          this.snackBar.open('Conta criada com sucesso!', 'Ok', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.snackBar.open(err.error.error || 'Erro ao cadastrar', 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}
