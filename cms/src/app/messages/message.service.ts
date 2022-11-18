import { EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

export class MessageService {
  messagesChanged = new EventEmitter<Message[]>();
  messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
   } 

   getMessage(id: number): Message {
     for(const message of this.messages) {
       if(message.id === id) {
         //console.log(`message.id inside getMessage in MessageService: ${message.id}`)         
         return message;
       }
     }
     return null;
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