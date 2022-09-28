import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css'],
  styles: [`
    h3 { color: dodgerblue; }
  `]
})
export class AppComponent {
  toggleDisplay: boolean = false;
  log: Date[] = [];
  numberslog: number[] = [];

  getTimestamp(): number {
      const current = new Date();
      current.setHours(0);
      current.setMinutes(0);
      current.setSeconds(0);
      current.setMilliseconds(0);
      return current.getTime();
  }

  onToggleDisplay(): void {
    this.toggleDisplay = !this.toggleDisplay;
    this.numberslog.push((this.numberslog.length + 1));
    this.log.push(new Date());
    //console.log(this.log);
  }

}
