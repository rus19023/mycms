import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
import { MessageService } from '../messages/message.service';

@Injectable({ providedIn: 'root' })

export class ContactService {
    contactSelectedEvent = new Subject<Contact>();
    contactListChangedEvent = new Subject<Contact[]>();
    contact: Contact;
    private contacts: Contact[];
    maxContactId: number;

    constructor(
        private msgService: MessageService
        ) 
        {         
            this.maxContactId = this.getMaxId();
        } 

//   getContact(id: number): Contact {
//     for(const contact of this.contacts) {
//       if(contact.id === id) {
//         console.log(`contact.id inside getContact in ContactService: ${contact.id}`)
//         return contact;
//       }
//     }
//     return null;
//   }  

    getMaxId(): number {
        let maxId = 0;
        this.contacts.forEach(element => {
           let currentId = element.id;
           //console.log(`element.id: ${element.id}`)
           if (currentId > maxId) {
              maxId = currentId;
           }
        }); 
        return maxId;
    }

    getContact(index: number) {
        return this.contacts[index];
    }

    getContacts() {
        return this.contacts.slice();
    } 

    addContact(newContact: Contact) {
        if (!newContact) {
            console.log('No document info received.');
            return;
        } else {
            this.maxContactId++;
            newContact.id = this.maxContactId;  
            this.contacts.push(newContact);
            let contactsListClone = this.contacts.slice()
            this.contactListChangedEvent.next(contactsListClone);
        }
    }

    updateContact(originalContact: Contact, newContact: Contact) { 
        console.log('inside updateContact, line 70');
        // Check for missing document information
        if (!originalContact || !newContact) {
            console.log('No contact info received.');
            return;
        } 
        let pos = this.contacts.indexOf(originalContact);
        if (pos < 0) {
            console.log('Invalid contact info.');
            return;
        }      
        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        let contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
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
        this.contactListChangedEvent.next(this.contacts.slice());
    }

}
