import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {
  hours!: string;
  minutes!: string;
  seconds!: string;

  constructor() { }

  ngOnInit(): void {
    this.hours = '00';
    this.minutes = '00';
    this.seconds = '00';
  }

  playTime(): void {
    console.log(this.hours + ":" + this.minutes + ":" + this.seconds)
  }

  twentyFiveMinutes(): void{
    this.minutes = '25';
  }

  fiveMinutes(): void{
    this.minutes = '05';
  }
}
