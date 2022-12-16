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
    configUrl: string = 'http://localhost:3333/messages';

    constructor( private http: HttpClient ) 
        {
            this.http
            .get(this.configUrl)
            .subscribe(
                (messages: any) => {
            this.messageList = messages;
            this.messageList.sort((a, b) => {
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                }
                return 0;
            });
            //emit the next list change event
            this.messageListChangedEvent.next(this.messageList.slice());
            },
            // error method
            (error: any) => {
            //print the error to the console
            console.error(error);
            }
        );
    }

    fetchMessages() {
        return this.http
        .get<Message[]>(this.configUrl)     
        .subscribe(
            // success method
            (messages: Message[] ) =>  {              
                this.messageList = messages;
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
        const messagesList = JSON.stringify(this.messageList);
        let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    this.http
      .put(this.configUrl,
        messagesList
      )
      .subscribe(() =>
        this.messageListChangedEvent.next(this.messageList.slice())
      );   
    }

    getMaxId(): number {
        let maxId = 0;
        this.messageList.forEach(element => {
            let currentId = +element.id;
            if (currentId > maxId) {
                maxId = currentId;
            }
        });
        console.log(maxId);
        return maxId++;
    }

    getMessage(id: string): Message {
        for(const message of this.messageList) {
            if(message.id === id) {
                //console.log(`message.id inside getMessage in MessageService: ${message.id}`)         
                return message;
            }
        }
        return null;
    }

    addMessage(message: Message) {
        if (!message) {
            return;
          }
      
          message.id = '';
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      
          // add to database
          this.http
            .post<{ message: string; data: Message }>(this.configUrl,
              message,
              { headers: headers }
            )
            .subscribe((responseData) => {
              // add new document to documents
              this.messageList.push(responseData.data);
              this.storeMessages();
            });
    }
   
}