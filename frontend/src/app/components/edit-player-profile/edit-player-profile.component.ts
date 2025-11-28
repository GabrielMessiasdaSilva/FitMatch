import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayersService } from '../../services/players.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-player-profile',
  templateUrl: './edit-player-profile.component.html',
  styleUrls: ['./edit-player-profile.component.scss']
})
export class EditPlayerProfileComponent implements OnInit {
  profileForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  positions = ['Goleiro', 'Defesa', 'Meio-Campo', 'Atacante'];
  levels = ['Iniciante', 'Intermediário', 'Avançado'];

  constructor(
    private fb: FormBuilder,
    private playersService: PlayersService,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadPlayerData();
  }

  private initializeForm(): void {
    this.profileForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      posicao: [''],
      nivel: [''],
      idade: ['', [Validators.min(13), Validators.max(120)]],
      neighborhood: ['']
    });
  }

  private loadPlayerData(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.playersService.getPlayerById(userId).subscribe({
      next: (player) => {
        this.profileForm.patchValue({
          nome: player.nome || '',
          posicao: player.posicao || '',
          nivel: player.nivel || '',
          idade: player.idade || '',
          neighborhood: player.neighborhood || ''
        });
      },
      error: (err) => {
        console.error('Erro ao carregar perfil:', err);
        this.errorMessage = 'Erro ao carregar seus dados. Tente novamente.';
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Por favor, preencha os dados corretamente.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const userId = this.authService.getUserId();
    if (!userId) {
      this.errorMessage = 'Erro de autenticação. Faça login novamente.';
      this.loading = false;
      return;
    }

    const formData = this.profileForm.value;

    this.playersService.updateProfile(userId, formData).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Perfil atualizado com sucesso!';
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erro ao atualizar perfil:', err);
        this.errorMessage = 'Erro ao atualizar perfil. Tente novamente.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/profile']);
  }
}
