import { Component, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/services/player.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {
  name = '';
  subscriptionPlayers: Subscription;
  data: any;
  dates: string[] = [];
  johnPoints: number[] = [];
  larryPoints: number[] = [];
  canvas;
  left: number;
  top: number;
  constructor(
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var num = 2;
    this.subscriptionPlayers = this.playerService
      .getPlayers()
      .subscribe((players) => {
        this.name = this.router.url.substring(1);
        //if it is not larry's or john's chart 
        if (this.name != 'john' && this.name != 'larry') {
          this.router.navigate(['/']);
        }

        this.dates = players.data.DAILY.dates;
        this.johnPoints = players.data.DAILY.dataByMember.players.john.points;
        this.larryPoints = players.data.DAILY.dataByMember.players.larry.points;

        const canvas = <HTMLCanvasElement>document.getElementById('chart');
        this.canvas = canvas;
        this.left = canvas.getBoundingClientRect().x;
        this.top = canvas.getBoundingClientRect().y;

        const context = canvas.getContext('2d');

        context.fillStyle = '#262a33';
        context.fillRect(
          0,
          0,
          this.playerService.config.chartWidth,
          this.playerService.config.chartHeight
        );
        if (this.name == 'john') {
          num = 0;
          this.playerService.drawPlayer(
            context,
            this.johnPoints,
            this.dates,
            'cyan'
          );
          this.playerService.addTitleToChart(context, 'Johns Score');
        } else if (this.name == 'larry') {
          num = 1;
          this.playerService.drawPlayer(
            context,
            this.larryPoints,
            this.dates,
            'pink'
          );
          this.playerService.addTitleToChart(context, 'Larrys Score');
        } else {
          this.playerService.drawBarChart(
            context,
            this.johnPoints,
            this.larryPoints,
            this.dates
          );
          this.playerService.addTitleToChart(context, 'John & Larry Score');

          num = 2;
        }

        this.playerService.addHorizontalLines(context);
        canvas.addEventListener('click', (e) => {
          this.playerService.handleMouseMove(
            e,
            context,
            this.johnPoints,
            this.larryPoints,
            this.top,
            this.left,
            num
          );
        });
      });
  }

  ngOnDestroy(): void {
    this.subscriptionPlayers.unsubscribe();
  }
}
