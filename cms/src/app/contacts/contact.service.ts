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

  // getContact(id: number): Contact {
  //   console.log(`service, line 19, this.contactSelected: ${this.contactSelected}`)
  //   //return this.contact;
  //   console.log(`id: ${id}`)
  //   for (const contact of this.contacts) {
  //     if (contact.id === id) {
  //       console.log(`service, line 22, this.contactSelected: ${this.contactSelected}`)
  //       //return this.contactSelected.emit();
  //     }
  //   };
  //   return null;
  //   // FOR each contact in the contacts list
  //   // IF contact.id equals the id THEN
  //   // RETURN contact
  //   // ENDIF
  //   // ENDFOR
  //   // RETURN null
  //  } 
}
