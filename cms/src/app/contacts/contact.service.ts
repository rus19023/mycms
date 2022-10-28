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
    this.contacts.forEach(contact => {
      if (this.contact.id === id) {
        return contact;
      } else {
        return null;
      }     
    });
    return null;
  }

  onSelected(): Contact {
      return this.contact;
  }

}
