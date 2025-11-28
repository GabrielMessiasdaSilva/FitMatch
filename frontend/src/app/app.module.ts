import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Importamos HTTP_INTERCEPTORS e HttpClientModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PlayersComponent } from './components/players/players.component';
import { TeamsComponent } from './components/teams/teams.component';
import { MatchesComponent } from './components/matches/matches.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { MatchProfileComponent } from './components/match-profile/match-profile.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { PublishVacancyComponent } from './components/publish-vacancy/publish-vacancy.component';
import { PostGameMonitorComponent } from './components/post-game-monitor/post-game-monitor.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AcessoRestritoComponent } from './components/acesso-restrito/acesso-restrito.component';
import { ListVacanciesComponent } from './components/list-vacancies/list-vacancies.component';
import { EditPlayerProfileComponent } from './components/edit-player-profile/edit-player-profile.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { ManageRosterComponent } from './components/manage-roster/manage-roster.component';
import { HistoryGamesComponent } from './components/history-games/history-games.component';
import { RegisterGameComponent } from './components/register-game/register-game.component';
import { EvaluatePlayersComponent } from './components/evaluate-players/evaluate-players.component';

// Interceptor
import { AuthInterceptor } from './services/auth.interceptor'; // Certifique-se que o caminho está correto

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PlayersComponent,
    TeamsComponent,
    MatchesComponent,
    DashboardComponent,
    LandingComponent,
    MatchProfileComponent,
    MatchListComponent,
    PublishVacancyComponent,
    PostGameMonitorComponent,
    SidebarComponent,
    AcessoRestritoComponent,
    ListVacanciesComponent,
    EditPlayerProfileComponent,
    EditTeamComponent,
    ManageRosterComponent,
    HistoryGamesComponent,
    RegisterGameComponent,
    EvaluatePlayersComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, // Necessário para o sistema de interceptors de classe
    ReactiveFormsModule,
    FormsModule, // Necessário para ngModel
    // Material
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule
  ],
  providers: [
    // Registro do interceptor: usa a classe AuthInterceptor e define multi: true
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }