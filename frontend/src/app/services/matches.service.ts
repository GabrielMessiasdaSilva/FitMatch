import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  private apiUrl = 'http://localhost:3000/api/matches';

  constructor(private http: HttpClient) {}

  apply(teamId: string): Observable<any> {
    return this.http.post(this.apiUrl, { teamId });
  }

  respond(matchId: string, status: 'accepted' | 'rejected'): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${matchId}/respond`, { status });
  }

  getMyMatches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-matches`);
  }
}