import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Params, Router, ActivatedRoute } from '@angular/router';

import { Message } from '../message.model';
import { MessageService } from '../message.service';   

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})

export class MessageEditComponent {
    currentSender = '101';      
    @ViewChild('f', {static: false}) f!: NgForm;

      constructor(
          private msgService: MessageService,
          private router: Router
      ) {}
  
    onSendMessage(form: NgForm) {
        let value = form.value;
        const newMessage = new Message("",value.subject,value.msgText,this.currentSender);
        this.msgService.addMessage(newMessage);
        this.onClear();
        this.router.navigateByUrl('/messages');
    }

    onClear() {        
        this.f.resetForm();
    }

}
