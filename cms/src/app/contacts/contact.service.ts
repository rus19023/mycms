import { EventEmitter } from '@angular/core';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

export class ContactService {
  contactSelected = new EventEmitter<Contact>();
  contact: Contact;
  private contacts: Contact[] = [];

  constructor() { 
    this.contacts = MOCKCONTACTS;
  } 

  getContacts() {
    return this.contacts.slice();
  }

  onSelected(): Contact {
      return this.contact;
  }

}
