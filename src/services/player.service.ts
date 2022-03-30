import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  config: Config;
  constructor(private http: HttpClient) {}
  UrlPlayerJson = 'http://cdn.55labs.com/demo/api.json';

  getPlayers(): Observable<any> {
    return this.http.get<any>(this.UrlPlayerJson);
  }

  handleMouseMove(e: any, context, john, larry, top, left, num) {
    var ind = 0;
    e.preventDefault();
    e.stopPropagation();

    var offsetX = left;
    var offsetY = top;
    var mouseX = Math.floor(e.clientX - offsetX);
    var mouseY = Math.floor(e.clientY - offsetY);
    for (let i = 0; i < 30; i++) {
      //if larry's points and john's points are close , make an offset between the numbers
      if (larry[i] - john[i] < 30) {
        ind = -10;
      }
      if (
        mouseX > 50 * i + 25 &&
        mouseX < (i + 1) * 50 + 25 &&
        mouseY < this.config.chartHeight - top &&
        (num == 0 || num == 2)
      ) {
        this.addScoreTochart(
          context,
          john[i],
          30 + i * 50,
          this.config.chartHeight - (john[i] / 10) * 2 - 105 - ind,
          'blue'
        );
      }
      if (
        mouseX > 50 * i + 30 &&
        mouseX < (i + 1) * 50 + 30 &&
        mouseY < this.config.chartHeight - top &&
        (num == 1 || num == 2)
      ) {
        this.addScoreTochart(
          context,
          larry[i],
          30 + i * 50,
          this.config.chartHeight - (larry[i] / 10) * 2 - 130,
          'red'
        );
      }
    }
  }

  //draw one chart
  drawPlayer(context, points, dates, color, offset = 0) {
    for (let player = 0; player < 30; player++) {
      if (points[player] == null) {
        points[player] = 0;
      }

      context.fillStyle = color; // choose the color

      context.fillRect(
        25 + offset + player * 50,
        this.config.chartHeight - (points[player] / 10) * 2 - 110,
        30,
        (points[player] / 10) * 2
      );
      //add dates
      this.addDateText(
        context,
        this.formatDate(dates[player]),
        30 + player * 50,
        this.config.chartHeight - 85
      );
    }
  }

  //draw two charts
  drawBarChart(context, john, larry, dates) {
    this.drawPlayer(context, john, dates, '#36b5d8');
    this.drawPlayer(context, larry, dates, 'pink', 10);
  }

  addTitleToChart(context, title) {
    title =title+" : Click on any Bar to show details !";
    context.font = this.config.titleFont;
    context.fillStyle = this.config.titleColor;
    context.fillText(title, 400, 30);
  }

  addDateText(context, text, xpos, ypos) {
    context.font = this.config.columnFont;
    context.fillStyle = this.config.columnTitleColor;

    context.save();
    context.translate(xpos, ypos);
    context.rotate(-Math.PI / 2);
    context.fillText(text, -70, 15);
    context.restore();
  }

  addHorizontalLines(context) {
    context.font = this.config.leftaxisFont;
    context.fillStyle = this.config.leftaxisColor;

    for (var i = 0; i < 25; i++) {
      context.lineWidth = 0.1;

      context.beginPath();
      context.moveTo(20, 20 * i + 40);
      context.lineTo(2975, 20 * i + 40);
      context.strokeStyle = this.config.leftaxisColor;
      context.stroke();
    }
  }


  addScoreTochart(context, name, xpos, ypos, color = 'white') {
    context.font = this.config.columnFont;
    context.fillStyle = color;
    context.fillText(name, xpos, ypos);
  }

  formatDate(date: string) {
    if (date == null) return 'No date';
    const year = date.substring(0, 4); //because the year is 20160 we only need to take 2016
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return year + '-' + month + '-' + day;
  }
}
