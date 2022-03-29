import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerService} from "../services/player.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscriptionPlayers: Subscription;
  data: any;
  dates : String[] = [];
  johnPoints: number[] = [];
  larryPoints: number[] = [];
  chartMetaInfo
  constructor(private playerService: PlayerService,) {
  }

  ngOnInit(): void {
    this.subscriptionPlayers = this.playerService.getPlayers().subscribe(players => {
      this.dates = players.data.DAILY.dates;
      this.johnPoints = players.data.DAILY.dataByMember.players.john.points;
      this.larryPoints = players.data.DAILY.dataByMember.players.larry.points;
      this.chartMetaInfo = {
        'chartWidth':'500',
        'chartHeight': '300',
        'title':'Indian cricketers with Most Centuries',
        'titleColor':'white',
        'titleFont': '20px sans-serif',
        'columnTitleColor': 'white',
        'columnFont': '12px sans-serif',
        'footerTitle':'Cricketer',
        'footerColor':'#c1d0cd',
        'footerFont': '12px sans-serif',
        'leftaxisColor': '#c1d0cd',
        'leftaxisFont': '12px sans-serif',
      }
      const canvas = <HTMLCanvasElement>document.getElementById('chart');
      const context = canvas.getContext('2d');
      context.fillStyle='#262a33';
      context.fillRect(0,0,this.chartMetaInfo.chartWidth,this.chartMetaInfo.chartHeight);

      this.drawBarChart(context);
      this.addTitleToChart(context);
      this.addFooterToChart(context);
      this.addHorizontalLines(context);

    });

  }

  addTitleToChart(context){
    context.font = this.chartMetaInfo.titleFont;
    context.fillStyle = this.chartMetaInfo.titleColor;
    context.fillText(this.chartMetaInfo.title,100,30);
  }

  addFooterToChart(context) {
    context.font = this.chartMetaInfo.footerFont;
    context.fillStyle = this.chartMetaInfo.footerColor;
    context.fillText(this.chartMetaInfo.footerTitle,this.chartMetaInfo.chartWidth/2,this.chartMetaInfo.chartHeight-10);
  }

  addColumnName(context,name,xpos,ypos){
    context.font = this.chartMetaInfo.columnFont;
    context.fillStyle = this.chartMetaInfo.columnTitleColor;
    context.fillText(name,xpos,ypos);
  }

  addHorizontalLines(context) {
    context.font = this.chartMetaInfo.leftaxisFont;
    context.fillStyle = this.chartMetaInfo.leftaxisColor;

    for(var i=0; i<11; i++) {

      context.lineWidth = 0.5;
      context.beginPath();
      context.moveTo(25,(20*i)+40);
      context.lineTo(475,(20*i)+40);
      context.strokeStyle  = this.chartMetaInfo.leftaxisColor;
      context.stroke();
    }
  }

  addColumnHead(context,name,xpos,ypos){
    context.font = this.chartMetaInfo.columnFont;
    context.fillStyle = this.chartMetaInfo.columnTitleColor;
    context.fillText(name,xpos,ypos);
  }
  formatDate(date){
    // date[4]="-"
    // date[]
  }
  drawBarChart(context){

    for(let player=0; player<30; player++) {
      context.fillStyle = "#36b5d8";
      let playerInfo = this.johnPoints;
      //I add -60 to fit perfectly on the first horizontal line
      context.fillRect(25 + player*100, this.chartMetaInfo.chartHeight-this.johnPoints[player]*2-60, 50, this.johnPoints[player]*2);
      this.addColumnName(context,"john", 25 + player*100,this.chartMetaInfo.chartHeight-40);
      this.addColumnHead(context,this.johnPoints[player],45 + player*100,this.chartMetaInfo.chartHeight-this.johnPoints[player]*2-65)
    console.log(player , this.johnPoints[player])
    }

  }
  ngOnDestroy(): void {
    this.subscriptionPlayers.unsubscribe()
  }


}
