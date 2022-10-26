import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact.service';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
    selector: 'cms-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.css']
})

export class MessageListComponent implements OnInit {
    messages: Message[] = [];

    constructor(private msgService: MessageService, private contactService: ContactService) {}

    ngOnInit() {
        this.messages = this.msgService.getMessages();
        //this.contactService.contactSelected.emit(this.contact);
        this.msgService.messagesChanged
            .subscribe(
            (messages: Message[]) => {
                this.messages = messages;
            }
        );
    }

}
