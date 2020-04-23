import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseUrl';
import { PickPugPoopResult } from '../shared/pickpugpoopResult';
import { TopPlayers } from '../shared/topPickPugPoopPlayers';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PickPugPoopResultService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService) { }

  getResults() {
    return this.http.get<PickPugPoopResult[]>(baseURL + 'pickpugpoopResults');
  }

  postResults(result: PickPugPoopResult, gameStartToken: string):Observable<PickPugPoopResult> {
    let token = this.tokenService.getJWT();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'gameStartToken': gameStartToken
      })
    };

    return this.http.post<PickPugPoopResult>(baseURL + 'pickpugpoopResults',result, httpOptions);
  }

  getTopResults() {
    return this.http.get<TopPlayers>(baseURL + 'pickpugpoopResults/topPlayers');
  }

  getGameStartToken(difficulty: string) {
    let token = this.tokenService.getJWT();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post<any>(baseURL + 'pickpugpoopResults/gameStartToken', {difficulty: difficulty} ,httpOptions);
  }
}
