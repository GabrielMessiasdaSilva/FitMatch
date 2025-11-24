import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private apiUrl = 'http://localhost:3000/api/teams';

  constructor(private http: HttpClient) {}

  getTeams(filters?: any): Observable<any[]> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) params = params.append(key, filters[key]);
      });
    }
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  getTeamById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateTeam(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  manageRoster(id: string, playerId: string, action: 'add' | 'remove'): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/roster`, { playerId, action });
  }
}