import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private apiUrl = 'http://localhost:3000/api/players';

  constructor(private http: HttpClient) {}

  getPlayers(filters?: any): Observable<any[]> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) params = params.append(key, filters[key]);
      });
    }
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  getPlayerById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateProfile(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  toggleFavorite(id: string, teamId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/favorite`, { teamId });
  }
}