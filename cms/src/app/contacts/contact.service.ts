import { EventEmitter } from '@angular/core';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contact: Contact;
  private contacts: Contact[] = [];

  constructor() { 
    this.contacts = MOCKCONTACTS;
  } 

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: number): Contact {
    console.log(`this.contact.id inside getContact in ContactService: ${this.contact.id}`);

    for(const contact of this.contacts) {
      console.log(`this.contact.id inside getContact in ContactService: ${this.contact.id}`);
          if (this.contact.id === id) {
            console.log(`this.contact.id inside getContact in ContactService: ${this.contact.id}`);
            return contact;
          } 
          return null;          
        }
        return null;    
    }

  onSelected(): Contact {
      return this.contact;
  }

}
