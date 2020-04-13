import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { PickPugPoopResult } from '../shared/pickpugpoopResult';
import { TopPlayers } from '../shared/topPickPugPoopPlayers';

@Injectable({
  providedIn: 'root'
})
export class PickPugPoopResultService {

  constructor(private http: HttpClient) { }

  getResults() {
    return this.http.get<PickPugPoopResult[]>(baseURL + 'pickpugpoopResults');
  }

  getTopResults() {
    return this.http.get<TopPlayers>(baseURL + 'pickpugpoopResults/topPlayers');
  }
}
