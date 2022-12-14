import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
    selector: 'cms-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.css']
})

export class MessageListComponent implements OnInit, OnDestroy {
    messages: Message[] = [];
    fetchMessages: Subscription;
    maxMessageId: number;   

    constructor(
        private msgService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() { 
        // Loads messages array from storage
        this.fetchMessages = this.msgService.fetchMessages();
        this.maxMessageId = +this.msgService.getMaxId;
        // Sends messages to service        
        this.msgService.messageListChangedEvent
        .subscribe(
            (messages: Message[]) => {
                this.messages = messages
            }
        );
    }

    onNewMessage() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    ngOnDestroy() {
        this.fetchMessages.unsubscribe();
    }

}
