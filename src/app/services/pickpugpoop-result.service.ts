import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { PickPugPoopResult } from '../shared/pickpugpoopResult';

@Injectable({
  providedIn: 'root'
})
export class PickpugpoopResultService {

  constructor(private http: HttpClient) { }

  getResults() {
    return this.http.get<PickPugPoopResult[]>(baseURL + 'pickpugpoopResults');
  }

  getTopResults() {
    return this.http.get(baseURL + 'topplayers');
  }
}
