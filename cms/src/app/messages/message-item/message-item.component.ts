import { Component, OnInit, Input } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
    selector: 'cms-message-item',
    templateUrl: './message-item.component.html',
    styleUrls: ['./message-item.component.css']
})

export class MessageItemComponent implements OnInit {
    messageSender: string;
    @Input() message: Message;

    constructor(
        private msgService: MessageService,
        private contactService: ContactService
    ) {}

    ngOnInit() {
        this.msgService.messageSelected
        .subscribe(
            (message: Message) => {
                this.message = message;
                console.log('ngOnInit, this.message.sender: ', this.message.sender);
            }
        )
        // Collect the contact data into a constant contact variable
        // Get index of contact with this sender id
        const index = this.contactService.getContactById(this.message.sender);
        
        const contact: Contact = this.contactService.getContact(index);
        // get the sender name from contact linked to the message sender id
        console.log('this.message.sender', this.message.sender);
        console.log('contact.cname', contact.cname);
        this.messageSender = contact.cname;
    }
}
