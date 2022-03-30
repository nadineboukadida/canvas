import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerService } from './player.service';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigHttpService {
  constructor(private http: HttpClient, private configService: PlayerService) {}
  //fetch the json file containing general infos about our chart canvas
  initializeApp() {
    this.http.get('assets/config.json').subscribe((response) => {
      this.configService.config = <Config>response;
      console.log(response);
    });
  }
}
