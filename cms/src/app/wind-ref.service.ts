import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindRefService {

  constructor() {}

  getNativeWindow() {
    return window;
  }

}
