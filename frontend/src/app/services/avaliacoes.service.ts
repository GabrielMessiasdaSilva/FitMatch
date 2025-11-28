import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliacoesService {
  private apiUrl = 'http://localhost:3000/api/avaliacoes';

  constructor(private http: HttpClient) {}

  // Cria uma avaliação para um jogador
  createAvaliacao(data: { jogadorId: string; jogoId: string; nota: number; comentario: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Lista avaliações de um jogador
  getAvaliacoesByPlayer(jogadorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/jogador/${jogadorId}`);
  }

  // Lista avaliações de um jogo
  getAvaliacoesByGame(jogoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/jogo/${jogoId}`);
  }
}