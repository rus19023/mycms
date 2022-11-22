import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
import { MessageService } from '../messages/message.service';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contact: Contact;
  private contacts: Contact[] = [];
  maxDocumentId: number;

  constructor(private msgService: MessageService) { 
    this.contacts = MOCKCONTACTS;
  } 

  getContact(id: number): Contact {
    for(const contact of this.contacts) {
      if(contact.id === id) {
        console.log(`contact.id inside getContact in ContactService: ${contact.id}`)
        return contact;
      }
    }
    return null;
  }  

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach(element => {
       let currentId = element.id;
       console.log(`element.id: ${element.id}`)
       if (currentId > maxId) {
          maxId = currentId;
       }
    });  
    console.log(`maxId: ${maxId}`);
    return maxId;
 }

  getContactByID(index: number) {
    return this.contacts[index];
  }

  getContacts() {
    return this.contacts.slice();
  }

  deleteContact(contact: Contact) {
      if (!contact) {
        return;
      }
      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
        return;
      }
      this.contacts.splice(pos, 1);
      //this.contactChangedEvent.next(this.contacts.slice());
  }

}
