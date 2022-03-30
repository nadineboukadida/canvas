import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  chartInfo = {
    chartWidth:1300,
    chartHeight: 570,
    titleColor:'white',
    titleFont: '20px sans-serif',
    columnTitleColor: 'white',
    columnFont: '15px sans-serif',
    footerTitle:'Scores',
    footerColor:'#c1d0cd',
    footerFont: '15px sans-serif',
    leftaxisColor: '#c1d0cd',
    leftaxisFont: '15px sans-serif',
  }
  constructor(private http: HttpClient) { }

  UrlPlayerJson = 'http://cdn.55labs.com/demo/api.json';

  getPlayers(): Observable<any> {
    return this.http.get<any>(this.UrlPlayerJson);
  }


  handleMouseMove(e:any, context, john,larry,top,left , num) {
    var ind=0


    e.preventDefault();
    e.stopPropagation();
    var offsetX =left;
var offsetY = top;
    var mouseX =  Math.floor(e.clientX - offsetX);
    var mouseY = Math.floor(e.clientY - offsetY);
for (let i=0 ; i<30; i++){
      if(larry[i]-john[i]<30 )
    {ind=-10
      console.log("first")
    }
  if((mouseX>(50*(i))+25 )&&( mouseX<((i+1)*50)+25) &&(mouseY<this.chartInfo.chartHeight-top)&& (num==0|| num==2))
{
  this.addColumnHead(context,john[i],30+ i*50,this.chartInfo.chartHeight-john[i]/10*2-105-ind, "blue")

}
if((mouseX>(50*(i))+30 )&&( mouseX<((i+1)*50)+30) &&(mouseY<this.chartInfo.chartHeight-top)&& (num==1|| num==2))
{ this.addColumnHead(context,larry[i],30 + i*50,this.chartInfo.chartHeight-larry[i]/10*2-130, "red")
}
}
}

drawPlayer(context, points ,dates,color,offset=0) {
  for(let player=0; player<30; player++) {
    if (points[player]==null){
      points[player]=0 }

    context.fillStyle = color;
    let playerInfo = points;
    //I add -60 to fit perfectly on the first horizontal line
    context.fillRect(25 +offset+ player*50,this.chartInfo.chartHeight-points[player]/10*2-110, 30, (points[player]/10)*2);
   this.addColumnName(context,this.formatDate(dates[player]), 30 +player*50,this.chartInfo.chartHeight-85);}
  

}
drawBarChart(context,john,larry , dates ){
this.drawPlayer(context,john,dates,"#36b5d8");
this.drawPlayer(context,larry,dates,"pink",10);
}

addTitleToChart(context , title){
  context.font = this.chartInfo.titleFont;
  context.fillStyle = this.chartInfo.titleColor;
  context.fillText(title,600,30);
}



addColumnName(context,name,xpos,ypos){
  context.font = this.chartInfo.columnFont;
  context.fillStyle = this.chartInfo.columnTitleColor;
  context.save();
  context.translate(xpos, ypos);
  context.rotate(-Math.PI / 2);
  
      context.fillText(name,-70,15);
  context.restore();

}

addHorizontalLines(context) {
  context.font = this.chartInfo.leftaxisFont;
  context.fillStyle = this.chartInfo.leftaxisColor;

  for(var i=0; i<25; i++) {

    context.lineWidth = 0.1;
    context.beginPath();
    context.moveTo(20,(20*i)+40);
    context.lineTo(2975,(20*i)+40);
    context.strokeStyle  = this.chartInfo.leftaxisColor;
    context.stroke();
  }
}

addColumnHead(context,name,xpos,ypos , color="white"){
  
  context.font = this.chartInfo.columnFont;
  context.fillStyle = color;
  context.fillText(name,xpos,ypos);
}
removeColumnHead(context,name,xpos,ypos){
  
}

removeColumnName(context,name,xpos,ypos,color="white") {
// context.font = this.chartInfo.columnFont;
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

}
