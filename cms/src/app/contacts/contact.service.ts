import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
import { MessageService } from '../messages/message.service';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
      //, Authorization: 'my-auth-token'
    })
};

@Injectable({ providedIn: 'root' })

export class ContactService {
    private contactList: Contact[] = [];
    contactSelected = new Subject<Contact>();
    contactListChangedEvent = new Subject<Contact[]>();
    maxContactId: number; 
    configUrl: string = 'https://bonniesites-solutions-cms-default-rtdb.firebaseio.com/contacts.json';

    constructor(
        private msgService: MessageService,
        private http: HttpClient
    ) {} 

    fetchContacts() {
        return this.http
        .get<Contact[]>(this.configUrl)     
        .subscribe(
            // success method
            (contacts: Contact[] ) =>  { 
                //console.log(`contacts, inside subscribe, docService, fetchContacts, success: ${contacts}`);               
                this.contactList = contacts;
                //console.log(`this.contactList, inside subscribe, contactService, fetchContacts, success: ${this.contactList}`);   
                this.maxContactId = this.getMaxId();
                //sort the list of contacts
                this.contactList.sort((a, b) => {
                    if (a.cname > b.cname) {
                    return 1;
                    } else { 
                    return -1;
                    }
                });
                //console.log(`this.contactList: ${this.contactList}`);
                // Create a copy of the contact list
                let contactsListClone = this.contactList.slice(); 
                //console.log(`contactsListClone, inside subscribe, docService, fetchcontacts, success: ${contactsListClone}`);
                // Send the contact list copy to the next listener   
                this.contactListChangedEvent.next(contactsListClone);
            },  
            // error method
            (error: any) => {
            //print the error to the console
            console.log(`Error: ${error.message}`);
            }
        )}  

    storeContacts() {       
        const contacts = JSON.stringify(this.contactList);
        this.http
        .put(
            this.configUrl
            , contacts
            , httpOptions
        )
        .subscribe(response => {
            console.log(`response: ${response}`);
        });       
    }    

    getMaxId(): number {
        let maxId = 0;
        this.contactList.forEach(element => {
           let currentId = element.id;
           // console.log(`in getMaxId(), element.id: ${element.id}`);
           if (currentId > maxId) {
              maxId = currentId;
           }
        }); 
        return maxId;
    }

    getContact(index: number) {
        // console.log(`in contact.service, getContact line 87, \nindex: ${index}`);

        console.log(`in contact.service, getContact line 88, \nthis.contactList[index].cname: ${this.contactList[index].cname}`);

        // console.log(`in contact.service, getContact line 91, \nthis.contactList[index].id: ${this.contactList[index].id}`);

        return this.contactList[index];
    }

    addContact(newContact: Contact) {
        if (!newContact) {
            alert('No contact info received.');
            return;
        } else {
            this.maxContactId++;
            newContact.id = this.maxContactId;
            // Save the new contact into the contact list  
            this.contactList.push(newContact);
            alert('Contact added!');
            this.storeContacts();
        }
    }

    updateContact(originalContact: Contact, newContact: Contact) {

        console.log(`&&&&&&&& inside updateContact, line 112, 
        \n originalContact.cname: ${originalContact.cname}, 
        \n originalContact.email: ${originalContact.email},  
        \n originalContact.phone: ${originalContact.phone}, 
        \n originalContact.id: ${originalContact.id}`); 
        
        console.log(`&&&&&&&& inside updateContact, line 118, 
        \n newContact.cname: ${newContact.cname}, 
        \n newContact.email: ${newContact.email},  
        \n newContact.phone: ${newContact.phone}, 
        \n newContact.id: ${newContact.id}`);
        
        // Check for missing contact information
        if (!originalContact || !newContact) {
            alert('Contact info missing.');
            return;
        }

        console.log(`contact.service, updateContact line 112, \n this.contactList.indexOf(originalContact) \n${this.contactList.indexOf(originalContact)}`);

        // this.contactList.forEach(element => {
        //     console.log(`contact.service, updateContact line 117, \n element.id ${element.id}, \n element.cname ${element.cname}, \n element.group ${element.group}`)
        // });

        console.log(`contact.service, updateContact line 126, \n originalContact.id ${originalContact.id}, \n originalContact.cname ${originalContact.cname}, \n originalContact.group ${originalContact.group}`);
        
        // Get index of the original contact to replace it with the updated object
        let pos = this.contactList.indexOf(originalContact);

        // Console log originalContact info
        console.log(`contact.service, updateContact line 132, \n newContact.id: ${newContact.id}, \n originalContact.id: ${originalContact.id}`);

        console.log(`contact.service, updateContact line 134, pos: ${pos}`);

        console.log(`Contact.service, inside updateContact, line 136, \n newContact.id: ${newContact.id},\n originalContact: ${originalContact.id}, \n${originalContact.cname}, ${originalContact.imageUrl}, \n${originalContact.phone}, \n${originalContact.email}, \n${originalContact.group}`);

        if (pos < 0) {
            alert('Invalid update info.');
            return;
        } else {    
            newContact.id = originalContact.id;
            console.log(`contact.service, updateContact, line 119, \n newContact.id ${newContact.id},\n originalContact.id = ${originalContact.id}`);
            this.contactList[pos] = newContact;
            alert('Contact updated!');
            this.storeContacts();
        } 
    }

    deleteContact(contact: Contact) {
        if (!contact) {
            return;
        }
        const pos = this.contactList.indexOf(contact);
        if (pos < 0) {
            return;
        }
        this.contactList.splice(pos, 1);
        this.storeContacts();
    }

}
