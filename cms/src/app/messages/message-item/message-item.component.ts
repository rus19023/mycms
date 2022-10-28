import { Component, Input, OnInit   } from '@angular/core';

import { Message } from '../message.model';
import { Contact } from 'src/app/contacts/contact.model';
import { MessageService } from '../message.service';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  @Input() messageSender: string;
  @Input() contact: Contact;
  @Input() messageSelected: Message;

  constructor(
    private contactService: ContactService, 
    private msgService: MessageService
    ) {}

  ngOnInit() {
    this.contactService.contactSelectedEvent
      .subscribe(
        (contact: Contact) => {
          this.contact = contact;
        });
    this.msgService.messageSelected
      .subscribe(
        (message: Message) => {
          this.messageSelected = message;
        });
    
    this.msgService.messageSelected.emit(this.messageSelected);
    console.log(`this.contact: ${this.contact}`)
    this.contactService.contactSelectedEvent.emit(this.contact);
    console.log(`this.contactService.contactSelectedEvent: ${this.contactService.contactSelectedEvent}`)
    this.messageSender = this.contact?.cname;
    console.log(`this.contact?.cname: ${this.contact?.cname}`)
    console.log(`this.messageSender: ${this.messageSender}`)
  }

}
