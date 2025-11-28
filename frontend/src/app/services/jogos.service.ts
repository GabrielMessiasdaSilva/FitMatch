import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JogosService {
  private apiUrl = 'http://localhost:3000/api/jogos';

  constructor(private http: HttpClient) {}

  // Cria um novo jogo (apenas para times)
  createGame(data: { data: string; local: string; jogadoresPresentes: string[] }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Jogador confirma presença em um jogo
  confirmPresence(gameId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${gameId}/presenca`, {});
  }

  // Lista jogos (para o usuário logado - diferencia por role)
  getMyGames(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Lista jogos por time
  getGamesByTeam(teamId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?teamId=${teamId}`);
  }

  // Lista jogos por jogador
  getGamesByPlayer(playerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?playerId=${playerId}`);
  }

  // Obtém um jogo específico
  getGameById(gameId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${gameId}`);
  }
}
