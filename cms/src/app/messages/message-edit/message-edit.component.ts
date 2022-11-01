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
  currentId = 4;

  constructor(private msgService: MessageService) {}

  ngOnInit() {
  }
  
  onSendMessage() {
    this.currentId++;
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message(

      this.currentId, 
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
