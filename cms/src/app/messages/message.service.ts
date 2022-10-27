import { Injectable, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

import { ContactService } from '../contacts/contact.service';
import { Contact } from '../contacts/contact.model';

@Injectable()
export class MessageService {
  messageSelected = new EventEmitter<Message>();
  messagesChanged = new EventEmitter<Message[]>();
  contact: Contact;
  messages: Message[] = [];

  constructor(private contactService: ContactService) {
    this.messages = MOCKMESSAGES;
   }

   getContact() {
    return this.contactService.contactSelected;
   }

   getMessages() {
     return this.messages.slice();
   }

   addMessage(message: Message) {
    this.messages.push(message);
    this.messagesChanged.emit(this.messages.slice());
   }
 
   addMessages(messages: Message[]) {
     this.messages.push(...messages);
     this.messagesChanged.emit(this.messages.slice());
   }
}