import { Component } from '@angular/core';
import { lchown } from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css'],
  styles: [`
    h3 { color: dodgerblue; }
  `]
})
export class AppComponent {
  hide: boolean = false;
  log: string [];

  showHide(): string {
      return this.hide === false ? 'block' : 'transparent';
  }

  getTimestamp(): number {
      const current = new Date();
      current.setHours(0);
      current.setMinutes(0);
      current.setSeconds(0);
      current.setMilliseconds(0);lchown
      return current.getTime();
  }

  getHide(): boolean {
      return this.hide;
  }

  toggleHideJoke() { this.hide = !this.hide; this.log.push(this.getTimestamp()); }

  getLog() { return this.log; }
}
