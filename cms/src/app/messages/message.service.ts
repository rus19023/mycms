import { Injectable, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Contact } from '../contacts/contact.model';
import { ContactService } from '../contacts/contact.service';

@Injectable()
export class MessageService {
  messagesChanged = new EventEmitter<Message[]>();
  contact: Contact;
  messages: Message[] = [];

  constructor(private contactService: ContactService) {
    this.messages = MOCKMESSAGES;
   }

   getMessages(): Message[] {
     return this.messages.slice();
   }

   getMessage(id: number) {
    this.messages.forEach(message => {
      if(message.id === id) {
        return message;
      } 
      return null;      
    });
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