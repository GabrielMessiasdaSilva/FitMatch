import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamsService } from '../../services/teams.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {
  teamForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private teamsService: TeamsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadTeamData();
  }

  private initializeForm(): void {
    this.teamForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      localizacao: [''],
      maxJogadores: ['', [Validators.min(5), Validators.max(50)]],
      sport: ['']
    });
  }

  private loadTeamData(): void {
    const teamId = this.authService.getUserId();
    if (!teamId) {
      this.router.navigate(['/login']);
      return;
    }

    this.teamsService.getTeamById(teamId).subscribe({
      next: (team) => {
        this.teamForm.patchValue({
          nome: team.nome || '',
          localizacao: team.localizacao || '',
          maxJogadores: team.maxJogadores || '',
          sport: team.sport || ''
        });
      },
      error: (err) => {
        console.error('Erro ao carregar time:', err);
        this.errorMessage = 'Erro ao carregar dados do time. Tente novamente.';
      }
    });
  }

  onSubmit(): void {
    if (this.teamForm.invalid) {
      this.errorMessage = 'Por favor, preencha os dados corretamente.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const teamId = this.authService.getUserId();
    if (!teamId) {
      this.errorMessage = 'Erro de autenticação. Faça login novamente.';
      this.loading = false;
      return;
    }

    const formData = this.teamForm.value;

    this.teamsService.updateTeam(teamId, formData).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Time atualizado com sucesso!';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erro ao atualizar time:', err);
        this.errorMessage = 'Erro ao atualizar time. Tente novamente.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
