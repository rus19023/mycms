import { Component, Input, OnInit } from '@angular/core';

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
  messageItem: Message;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    console.log(`this.message?.sender: ${this.messageItem?.sender}`)
    const contact: Contact = this.contactService.getContact(this.messageItem.sender);
    this.messageSender = contact?.cname;
    console.log(`this.messageSender: ${this.messageSender}`)
    for (const [key, value] of Object.entries(this.messageItem)) {
      console.log(`${key}: ${value}`);
    }
    //console.log(`this.message?.sender: ${this.message?.sender}`)
      
    }
}
