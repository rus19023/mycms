import { Injectable, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable()
export class MessageService {
  messageSelected = new EventEmitter<Message>();
  messages: Message[];

  constructor() {
    this.messages = MOCKMESSAGES;
   }

   getMessages() {
     return this.messages.slice();
   }
}