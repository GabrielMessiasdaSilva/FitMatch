import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PlayersComponent } from './components/players/players.component';
import { TeamsComponent } from './components/teams/teams.component';
import { MatchesComponent } from './components/matches/matches.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'matches', component: MatchesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }