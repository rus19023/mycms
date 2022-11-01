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
    private contactService: ContactService) {}

  ngOnInit() {
    // Collect the contact data into the a constant contact variable 
      console.log(`this.message.sender: ${this.message.sender}`);
    const contact: Contact = this.contactService.getContact(this.message.sender);
    // get the sender id from message
    this.messageSender = contact.cname;

  }
}
