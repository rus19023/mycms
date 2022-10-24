import { Injectable, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable()
export class MessageService {
  messageSelected = new EventEmitter<Message>();
  messagesChanged = new EventEmitter<Message[]>();
  private messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
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