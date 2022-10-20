import { EventEmitter, Injectable } from '@angular/core';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {
  contactSelected = new EventEmitter<Contact>();
  private contacts: Contact[] = [];

  constructor() { // private messageService: MessageService inside "()"
    this.contacts = MOCKCONTACTS;
  }  

  getContacts() {
    return this.contacts.slice();
  }
}
