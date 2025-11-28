import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PlayersComponent } from './components/players/players.component';
import { TeamsComponent } from './components/teams/teams.component';
import { MatchesComponent } from './components/matches/matches.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthRoleGuard } from './services/auth-role.guard';
import { AcessoRestritoComponent } from './components/acesso-restrito/acesso-restrito.component';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { PublishVacancyComponent } from './components/publish-vacancy/publish-vacancy.component';
import { ListVacanciesComponent } from './components/list-vacancies/list-vacancies.component';
import { EditPlayerProfileComponent } from './components/edit-player-profile/edit-player-profile.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { ManageRosterComponent } from './components/manage-roster/manage-roster.component';
import { HistoryGamesComponent } from './components/history-games/history-games.component';
import { RegisterGameComponent } from './components/register-game/register-game.component';
import { EvaluatePlayersComponent } from './components/evaluate-players/evaluate-players.component';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, AuthRoleGuard], data: { role: 'team' } },
  { path: 'publish-vacancy', component: PublishVacancyComponent, canActivate: [AuthGuard, AuthRoleGuard], data: { role: 'team' } },
  { path: 'manage-team', component: TeamsComponent, canActivate: [AuthGuard, AuthRoleGuard], data: { role: 'team' } },
  { path: 'manage-roster', component: ManageRosterComponent, canActivate: [AuthGuard, AuthRoleGuard], data: { role: 'team' } },
  { path: 'edit-team', component: EditTeamComponent, canActivate: [AuthGuard, AuthRoleGuard], data: { role: 'team' } },
  { path: 'registrar-jogo', component: RegisterGameComponent, canActivate: [AuthGuard, AuthRoleGuard], data: { role: 'team' } },
  { path: 'avaliar-jogadores/:id', component: EvaluatePlayersComponent, canActivate: [AuthGuard, AuthRoleGuard], data: { role: 'team' } },
  { path: 'players', component: PlayersComponent, canActivate: [AuthGuard, AuthRoleGuard], data: { role: 'team' } },
  { path: 'vacancies', component: ListVacanciesComponent, canActivate: [AuthGuard, AuthRoleGuard], data: { role: 'player' } },
  { path: 'matches', component: MatchesComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: PlayersComponent, canActivate: [AuthGuard, AuthRoleGuard], data: { role: 'player' } },
  { path: 'profile/edit', component: EditPlayerProfileComponent, canActivate: [AuthGuard, AuthRoleGuard], data: { role: 'player' } },
  { path: 'historia-jogos', component: HistoryGamesComponent, canActivate: [AuthGuard, AuthRoleGuard], data: { role: 'player' } },
  { path: 'history', component: PlayersComponent, canActivate: [AuthGuard, AuthRoleGuard], data: { role: 'player' } },
  { path: 'applications', component: PlayersComponent, canActivate: [AuthGuard, AuthRoleGuard], data: { role: 'player' } },
  { path: 'acesso-restrito', component: AcessoRestritoComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }