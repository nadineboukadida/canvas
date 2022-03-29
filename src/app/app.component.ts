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
  dates : string[] = [];
  johnPoints: number[] = [];
  larryPoints: number[] = [];
  chartMetaInfo
  canvas
  left : number
  top:number
  constructor(private playerService: PlayerService,) {
  }

  ngOnInit(): void {
    this.subscriptionPlayers = this.playerService.getPlayers().subscribe(players => {
      this.dates = players.data.DAILY.dates;
      this.johnPoints = players.data.DAILY.dataByMember.players.john.points;
      this.larryPoints = players.data.DAILY.dataByMember.players.larry.points;
      this.chartMetaInfo = {
        'chartWidth':'1300',
        'chartHeight': '570',
        'title':'Scores',
        'titleColor':'white',
        'titleFont': '20px sans-serif',
        'columnTitleColor': 'white',
        'columnFont': '15px sans-serif',
        'footerTitle':'Scores',
        'footerColor':'#c1d0cd',
        'footerFont': '15px sans-serif',
        'leftaxisColor': '#c1d0cd',
        'leftaxisFont': '15px sans-serif',
      }
      const canvas = <HTMLCanvasElement>document.getElementById('chart');
      this.canvas=canvas
     this.left= canvas.getBoundingClientRect().x
     this.top= canvas.getBoundingClientRect().y

      const context = canvas.getContext('2d');
      context.fillStyle='#262a33';
      context.fillRect(0,0,this.chartMetaInfo.chartWidth,this.chartMetaInfo.chartHeight);

      this.drawBarChart(context);
      this.addTitleToChart(context);
    
      this.addHorizontalLines(context);
      canvas.addEventListener("click",(e)=> {
        this.handleMouseMove(e,context)
       this.handleMouseMove(e,context)
     


      })
  

    });

  }

  addTitleToChart(context){
    context.font = this.chartMetaInfo.titleFont;
    context.fillStyle = this.chartMetaInfo.titleColor;
    context.fillText(this.chartMetaInfo.title,600,30);
  }



  addColumnName(context,name,xpos,ypos){
    context.font = this.chartMetaInfo.columnFont;
    context.fillStyle = this.chartMetaInfo.columnTitleColor;
    context.save();
    context.translate(xpos, ypos);
    context.rotate(-Math.PI / 2);
    
        context.fillText(name,-70,15);
    context.restore();

  }

  addHorizontalLines(context) {
    context.font = this.chartMetaInfo.leftaxisFont;
    context.fillStyle = this.chartMetaInfo.leftaxisColor;

    for(var i=0; i<25; i++) {

      context.lineWidth = 0.1;
      context.beginPath();
      context.moveTo(20,(20*i)+40);
      context.lineTo(2975,(20*i)+40);
      context.strokeStyle  = this.chartMetaInfo.leftaxisColor;
      context.stroke();
    }
  }

  addColumnHead(context,name,xpos,ypos , color="white"){
    
    context.font = this.chartMetaInfo.columnFont;
    context.fillStyle = color;
    context.fillText(name,xpos,ypos);
  }
  removeColumnHead(context,name,xpos,ypos){
    
  }

  removeColumnName(context,name,xpos,ypos,color="white") {
  // context.font = this.chartMetaInfo.columnFont;
  //   context.globalAlpha = 0.2;
  //   context.fillText(name,xpos,ypos);
  }
  formatDate(date:string){
    if(date==null)return "No date"
  const year= date.substring(0,4); //because the year is 20160 we only need to take 2016
  const month = date.substring(4,6);
  const day = date.substring(6,8) 
  return year+"-"+month+"-"+day
  }
  drawBarChart(context){

    for(let player=0; player<30; player++) {
      if (this.johnPoints[player]==null){
        this.johnPoints[player]=0 }
      context.fillStyle = "#36b5d8";
      let playerInfo = this.johnPoints;
      //I add -60 to fit perfectly on the first horizontal line
      context.fillRect(25 + player*50,this.chartMetaInfo.chartHeight-this.johnPoints[player]/10*2-110, 30, (this.johnPoints[player]/10)*2);
      this.addColumnName(context,this.formatDate(this.dates[player]), 30 +player*50,this.chartMetaInfo.chartHeight-85);

    }

    for(let player=0; player<30; player++) {
      if (this.johnPoints[player]==null){
        this.johnPoints[player]=0 }
      context.fillStyle = "red";
      let playerInfo = this.larryPoints;
      //I add -60 to fit perfectly on the first horizontal line
      context.fillRect(30 + player*50,this.chartMetaInfo.chartHeight-this.larryPoints[player]/10*2-110, 30, (this.larryPoints[player]/10)*2);

    }
  }
   handleMouseMove(e:any, context) {
    e.preventDefault();
    e.stopPropagation();
    var offsetX = this.left;
var offsetY = this.top;
    var mouseX =  Math.floor(e.clientX - offsetX);
    var mouseY = Math.floor(e.clientY - offsetY);
for (let i=0 ; i<30; i++){
  if((mouseX>(50*(i))+25 )&&( mouseX<((i+1)*50)+25) &&(mouseY>this.chartMetaInfo.chartHeight-this.johnPoints[i]/10*2-85))
{
  this.addColumnHead(context,this.johnPoints[i],5+ i*50,this.chartMetaInfo.chartHeight-this.johnPoints[i]/10*2-115, "cyan")

}
if((mouseX>(50*(i))+30 )&&( mouseX<((i+1)*50)+30) &&(mouseY>this.chartMetaInfo.chartHeight-this.johnPoints[i]/10*2-85))
{ this.addColumnHead(context,this.larryPoints[i],30 + i*50,this.chartMetaInfo.chartHeight-this.larryPoints[i]/10*2-115, "white")
}
else {this.removeColumnName(context,this.johnPoints[i],5+ i*50,this.chartMetaInfo.chartHeight-this.johnPoints[i]/10*2-115, "cyan")
this.removeColumnName(context,this.larryPoints[i],30 + i*50,this.chartMetaInfo.chartHeight-this.larryPoints[i]/10*2-115, "white")}}
    // var dx = mouseX - circle.cx;
    // var dy = mouseY - circle.cy;
    // var isInside = dx * dx + dy * dy <= circle.radius * circle.radius;

    // if (isInside && !circle.wasInside) {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     drawCircle(circle, isInside);
    // } else if (!isInside && circle.wasInside) {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     drawCircle(circle, isInside);
    // }
}


  ngOnDestroy(): void {
    this.subscriptionPlayers.unsubscribe()
  }


}
