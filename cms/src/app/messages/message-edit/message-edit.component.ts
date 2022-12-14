import { Component, ElementRef, ViewChild } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';

import { Message } from '../message.model';
import { MessageService } from '../message.service';   

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
      currentSender = 19;
      @ViewChild('subject', { static: false }) subjectInputRef!: ElementRef;
      @ViewChild('msgText', { static: false }) msgTextInputRef!: ElementRef;
      maxMsgId: number;

      constructor(
          private msgService: MessageService,
          private router: Router
      ) {}
  
    onSendMessage() {
        this.maxMsgId = this.msgService.maxMessageId;
        const msgSubject = this.subjectInputRef.nativeElement.value;
        const msgText = this.msgTextInputRef.nativeElement.value;
        // console.log(`this.maxContactId: ${this.maxContactId}`);
        // console.log(`msgSubject: ${msgSubject}`);
        // console.log(`msgText: ${msgText}`);
        // console.log(`this.currentSender: ${this.currentSender}`);
        const newMessage = new Message(
            this.maxMsgId++, 
            msgSubject, 
            msgText, 
            this.currentSender
        );
        this.msgService.addMessage(newMessage);
        this.router.navigate(['/messages']);
    }

    onClear() {
        this.subjectInputRef.nativeElement.value = '';
        this.msgTextInputRef.nativeElement.value = '';
    }

}
