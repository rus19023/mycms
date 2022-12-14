import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Message } from './message.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
        //, Authorization: 'my-auth-token'
    })
};

@Injectable({ providedIn: 'root' })

export class MessageService {
    private messageList: Message[] = [];
    messageSelected = new Subject<Message>();
    messageListChangedEvent = new Subject<Message[]>();
    maxMessageId: number;
    configUrl: string = 'https://bonniesites-solutions-cms-default-rtdb.firebaseio.com/messages.json';

    constructor(
        private http: HttpClient
      ) {}

    fetchMessages() {
        return this.http
        .get<Message[]>(this.configUrl)     
        .subscribe(
            // success method
            (messages: Message[] ) =>  {              
                this.messageList = messages;
                this.maxMessageId = this.getMaxId();
                //sort the list of Messages
                this.messageList.sort((a, b) => {
                    if (a.id > b.id) {
                        return 1;
                    } else { 
                        return -1;
                    }
                });
                // Create a copy of the Messages list
                let MessagesListClone = this.messageList.slice(); 
                // Send the Messages list copy to the next listener   
                this.messageListChangedEvent.next(MessagesListClone);
            },  
            // error method
            (error: any) => {
                //print the error to the console
                console.log(error);
            }
        )
    }

    storeMessages() {       
        const Messages = JSON.stringify(this.messageList);
        this.http
        .put(
            this.configUrl
            , Messages
            , httpOptions
        )
        .subscribe(response => {
            console.log(response);
        });       
    }

    getMaxId(): number {
        let maxId = 0;
        this.messageList.forEach(element => {
            let currentId = element.id;
            if (currentId > maxId) {
                maxId = currentId;
            }
        });
        console.log(maxId);
        return maxId++;
    }

    getMessage(id: number): Message {
        for(const message of this.messageList) {
            if(message.id === id) {
                //console.log(`message.id inside getMessage in MessageService: ${message.id}`)         
                return message;
            }
        }
        return null;
    }

    addMessage(message: Message) {
        this.messageList.push(message);
        // this.messagesChanged.emit(this.messageList.slice());
        this.storeMessages();
    }
 

    // getMessage(index: number) {
    //     console.log(`this.messageList[index]: ${this.messageList[index]}`);
    //     return this.messageList[index];
    // }

    // addMessage(newMessage: Message) {
    //     if (!newMessage) {
    //         console.log('No Message info received.');
    //         return;
    //     } else {
    //         newMessage.id = this.maxMessageId;  
    //         this.messageList.push(newMessage);
    //         this.storeMessages();
    //     }
    // }

    //  getMessages() {
    //   return this.messages.slice();
    // }

    //  addMessages(messages: Message[]) {
    //    this.messages.push(...messages);
    //    this.messagesChanged.emit(this.messages.slice());
    //  }
   
}