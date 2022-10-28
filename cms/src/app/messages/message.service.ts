import { Injectable, EventEmitter, Input } from '@angular/core';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

import { ContactService } from '../contacts/contact.service';
import { Contact } from '../contacts/contact.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageSelected = new EventEmitter<Message>();
  messagesChanged = new EventEmitter<Message[]>();
  contact: Contact;
  messages: Message[] = [];

  constructor(private contactService: ContactService) {
    this.messages = MOCKMESSAGES;
    this.contactService.contactSelectedEvent.emit(this.contact);
   }

   getMessages() {
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
}