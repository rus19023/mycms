import { Component, OnInit, Input } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  messageSender: string;
  msgService: MessageService;
  @Input() contact: Contact;
  @Input() message!: Message;

  constructor(private contactService: ContactService) {

  }

  ngOnInit() {
    console.log(`this.contact: ${this.contact}`)
    this.contactService.contactSelected.emit(this.contact);
    console.log(`this.contactService.contactSelected: ${this.contactService.contactSelected}`)
    this.messageSender = this.contact?.cname;
    console.log(`this.contact?.cname: ${this.contact?.cname}`)
    console.log(`this.messageSender: ${this.messageSender}`)
  }

}
