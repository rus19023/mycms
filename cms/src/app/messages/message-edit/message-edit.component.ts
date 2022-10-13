import { 
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output 
} from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender ='Doris Rush-Lopez';
  @ViewChild('subject', { static: false }) subjectInputRef!: ElementRef;
  @ViewChild('msgText', { static: false }) msgTextInputRef!: ElementRef;
  currentId = 4;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor() {}

  ngOnInit(): void {
  }
  
  onSendMessage() {
    //debugger;
    this.currentId++;
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    // console.log(`this.currentId: ${this.currentId}`);
    // console.log(`msgSubject: ${msgSubject}`);
    // console.log(`msgText: ${msgText}`);
    // console.log(`this.currentSender: ${this.currentSender}`);
    const newMessage = new Message(
      this.currentId, 
      msgSubject, 
      msgText, 
      this.currentSender
      );
    // console.log(`newMessage.sender: ${newMessage.sender}`);
    this.addMessageEvent.emit(newMessage);
  }

  onClear():void {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }

}
