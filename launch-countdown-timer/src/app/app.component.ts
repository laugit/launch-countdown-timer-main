import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'launch-countdown-timer';
  days = '08';
  hours = '23';
  minutes = '55';
  seconds = '41';
  minset = false;
  secset = false;
  hourset = false;
  dayset = false;
  displaytype = (window.innerWidth < 376) ? 'mobile' : 'desktop';

  computeTime(value: string, unit: string): void {
    const calc =
      value !== '00'
        ? (parseInt(value, 10) - 1).toString()
        : unit !== 'hours'
        ? '59'
        : '23';
    const prefix = parseInt(calc, 10).toString().length === 1 ? '0' : '';
    const result = prefix + calc;
    if (unit === 'seconds') {
      this.secset = true;
      this.seconds = result;
      setTimeout(() => {
        this.secset = false;
      }, 800);
    } else if (unit === 'minutes') {
      this.minset = true;
      this.minutes = result;
      setTimeout(() => {
        this.minset = false;
      }, 800);
    } else if (unit === 'hours') {
      this.hourset = true;
      this.hours = result;
      setTimeout(() => {
        this.hourset = false;
      }, 800);
    }
  }

  ngOnInit(): void {
    window.onresize = () => {
      this.displaytype = (window.innerWidth < 376) ? 'mobile' : 'desktop';
    }
    setInterval(() => {
      this.computeTime(this.seconds, 'seconds');
      if (this.seconds === '59') {
        this.computeTime(this.minutes, 'minutes');
        if (this.minutes === '59') {
          this.computeTime(this.hours, 'hours');
          if (this.hours === '23') {
            const daycalc = (parseInt(this.days, 10) - 1).toString();
            const dayprefix =
              parseInt(daycalc, 10).toString().length === 1 ? '0' : '';
            this.dayset = true;
            this.days = dayprefix + daycalc;
            setTimeout(() => {
              this.dayset = false;
            }, 800);
          }
        }
      }
    }, 1000);
  }
}
