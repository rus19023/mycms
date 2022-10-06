import { 
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output } from '@angular/core';


import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
