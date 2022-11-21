import { 
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../message.service';   

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender = 19;
  @ViewChild('subject', { static: false }) subjectInputRef!: ElementRef;
  @ViewChild('msgText', { static: false }) msgTextInputRef!: ElementRef;
  maxContactId = 4;

  constructor(private msgService: MessageService) {}

  ngOnInit() {
  }
  
  onSendMessage() {
    this.maxContactId++;
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    // console.log(`this.maxContactId: ${this.maxContactId}`);
    // console.log(`msgSubject: ${msgSubject}`);
    // console.log(`msgText: ${msgText}`);
    // console.log(`this.currentSender: ${this.currentSender}`);
    const newMessage = new Message(
      this.maxContactId, 
      msgSubject, 
      msgText, 
      this.currentSender
      );
    this.msgService.addMessage(newMessage);
  }

  onClear():void {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }

}
