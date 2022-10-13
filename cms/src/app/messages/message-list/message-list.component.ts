import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Message } from '../message.model';

@Component({
    selector: 'cms-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() newMessage!: Message;
  messages: Message[] = [
      new Message(1, 'Need Help', 'Having trouble with assignment for Week 03', 'Doris Rush-Lopez'),
      new Message(2, 'Tutoring Available', 'Tutor sign ups at https://tutors.com/signup', 'Brother Jackson'),
      new Message(3, 'Graded', 'Week 04 assignment has been graded', 'Brother Barzee'),
  ];

  constructor() {}

  ngOnInit(): void {
  }

  checkForBlankString(input: string) {
    if (input === '') || (input === null)
        alert('Field cannot be empty')
  }

  onAddMessage(newMessage: Message) {
      this.messages.push(newMessage);
      console.log(`newMessage.sender: ${newMessage.sender}`);
      console.log(`messages: ${this.messages}`);
  }

}
