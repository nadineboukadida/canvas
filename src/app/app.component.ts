import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Subscription } from 'rxjs';
import { ConfigHttpService } from 'src/services/config-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private httpConfig: ConfigHttpService, private router: Router) {}

  ngOnInit(): void {
    this.httpConfig.initializeApp();
  }
  goto(pos: string) {          
    this.router.navigate([pos]);
    
}
}
