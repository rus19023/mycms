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
  @Input() contact: Contact;
  @Input() message!: Message;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.contactSelected.emit(this.contact);
    this.messageSender = this.contact.cname;
  }

}
