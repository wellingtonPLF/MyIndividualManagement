import {Component, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit{
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  timing!: string;
  tempo: number = 0;
  tempoTotal: number = 0;
  status: string = 'stopped';
  audio!: HTMLAudioElement;
  private subscription!: Subscription;

  constructor() { }

  ngOnInit(): void {
  }

  playTime(): void {
    if(this.tempoTotal == 0){
      this.tempoTotal = (parseInt(this.hours)* 60) * 60 + parseInt(this.minutes) * 60 + parseInt(this.seconds);
      this.hours = '00';
      this.minutes = '00';
      this.seconds = '00';
    }
    if (this.tempoTotal != 0){
      this.status = 'running'
      this.subscription = interval(1000)
        .subscribe(x => { this.getTimeDifference(); });
    }
  }

  twentyFiveMinutes(): void{
    this.minutes = '25';
  }

  fiveMinutes(): void{
    this.minutes = '05';
  }

  firstZero(numero: number): string{
    if(numero < 10){
      return '0' + numero;
    }
    return numero.toString();
  }
  //---------------------------------//
  getTimeDifference(): void{
    this.tempo += 1;
    this.allocateTimeUnits(this.tempo)

    if(this.tempoTotal <= this.tempo){
      this.unsubscribeImplementation('');
    }
  }

  allocateTimeUnits (time: any): void{
    if(time >= 60){
      if(Math.floor(time/60) >= 60){
        this.minutes = this.firstZero(Math.floor(time/60) % 60);
        this.hours = this.firstZero(Math.floor(Math.floor(time/60)/60));
      }
      else{
        this.minutes = this.firstZero(Math.floor(time/60));
      }
      this.seconds = this.firstZero(time%60);
      if(this.hours == '23' && this.minutes == '59' && this.seconds == '59'){
        this.unsubscribeImplementation('');
      }
    }
    else{
      this.seconds = this.firstZero(time);
    }
  }

  unsubscribeImplementation(tipo: string): void{
    if(tipo == 'cancel'){
      this.audio.pause();
      this.status = ''
    }
    else{
      if(this.tempoTotal != 0 && this.tempoTotal <= this.tempo){
        this.playAudio();
        this.status = 'cancel';
      }
      if(this.subscription != undefined){
        this.subscription.unsubscribe();
      }
    }
    this.setToZero(tipo);
  }

  setToZero(value: string): void{
    if(value == 'reset' || value == 'cancel'){
      this.tempo = 0
      this.hours = '00';
      this.minutes = '00';
      this.seconds = '00';
      this.tempoTotal = 0;
    }
    if(this.status != 'cancel'){
      this.status = 'stopped'
    }
  }
  //---------------------------------//

  playAudio(){
    this.audio = new Audio();
    this.audio.src = "../../../assets/audio/ring.wav";
    this.audio.loop = true;
    this.audio.load();
    this.audio.play();
  }
}
