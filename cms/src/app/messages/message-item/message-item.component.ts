import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
