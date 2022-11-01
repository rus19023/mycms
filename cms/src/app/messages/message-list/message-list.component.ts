import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
    selector: 'cms-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.css']
})

export class MessageListComponent implements OnInit {
    contact: Contact;
    messages: Message[] = [];

    constructor(
        private msgService: MessageService
        ) {}

    ngOnInit() { 
        // Loads messages array from storage
        this.messages = this.msgService.getMessages();
        // Sends contact to service
        
        this.msgService.messagesChanged
            .subscribe(
            (messages: Message[]) => {
                this.messages = messages
            });
    }

}
