import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  UrlPlayerJson = 'http://cdn.55labs.com/demo/api.json';

  getPlayers(): Observable<any> {
    return this.http.get<any>(this.UrlPlayerJson);
  }

}
