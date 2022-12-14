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
        private http: HttpClient,
        private msgService: MessageService
    ) {} 

    fetchContacts() {
        return this.http
        .get<Contact[]>(this.configUrl)     
        .subscribe(
            // success method
            (contacts: Contact[] ) =>  {
                // TODO: iterate over list, if array in contact.group, JSON.parse it into an array
                // if no array, create blank array
                contacts.forEach(element => {
                    // Check if group exists
                    if (!element.group || element.group == undefined || element.group == null) {
                        //console.log('element.group:', element.group);
                        // If not, add an empty array
                        element.group = [];
                    }          
                });               
             
                this.contactList = contacts;
                this.maxContactId = this.getMaxContactId();
                //sort the list of contacts
                this.contactList.sort((a, b) => {
                    if (a.cname > b.cname) {
                    return 1;
                    } else { 
                    return -1;
                    }
                });
                // Create a copy of the contact list
                let contactsListClone = this.contactList.slice(); 
                // Send the contact list copy to the next listener   
                this.contactListChangedEvent.next(contactsListClone);
            },  
            // error method
            (error: any) => {
            //print the error to the console
            console.log(`Error: ${error.message}`);
            }
        )
    }  

    storeContacts() {       
        const contacts = JSON.stringify(this.contactList);
        //console.log('inside storeContacts', contacts);
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

    getMaxContactId(): number {
        let maxId = 0;
        this.contactList.forEach(element => {
            let currentId = element.id;
            if (+currentId > maxId) {
                maxId = currentId;
                console.log('maxId', maxId);
            }
        }); 
        return maxId++;
    }

    getContact(index: number) {
        return this.contactList[index];
    }

    getContactById(id: number) {
        return this.contactList.findIndex(contact => contact.id === id);
    }

    addContact(newContact: Contact) {
        if (!newContact) {
            console.log('No contact info received.');
            return;
        } else {
            // Save the new contact into the contact list  
            this.contactList.push(newContact);
            console.log('Contact added!');
            this.storeContacts();
        }
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        
        // Check for missing contact information
        if (!originalContact || !newContact) {
            console.log('Contact info missing.');
            return;
        }
        
        // Get index of the original contact to replace it with the updated object
        //let pos = this.contactList.indexOf(originalContact);
        let pos = this.contactList.findIndex(contact => contact.id === originalContact.id);

        if (pos < 0) {
            console.log('Invalid update info.');
            return;
        } else {    
            newContact.id = originalContact.id;            
            this.contactList[pos] = newContact;
            console.log('Contact updated!');
            this.storeContacts();
        } 
    }

    deleteContact(contact: Contact) {
        if (!contact) {
            return;
        }
        //const pos = this.contactList.indexOf(contact);
        let pos = this.contactList.findIndex(ct => ct.id === contact.id);
        if (pos < 0) {
            return;
        }
        this.contactList.splice(pos, 1);
        this.storeContacts();
    }

}
