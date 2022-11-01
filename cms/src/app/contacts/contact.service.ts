import { EventEmitter, Injectable } from '@angular/core';

import { Contact } from './contact.model';
import { MessageService } from '../messages/message.service';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contact: Contact;
  private contacts: Contact[] = [];

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

  getContacts() {
    return this.contacts.slice();
  }

}
