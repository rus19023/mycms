import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',  // element
  //selector: '[app-servers]',  // attribute
  //selector: '.app-servers',   // class
  template: `
  <app-server></app-server>
  <app-server></app-server>
  `,
  //styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
