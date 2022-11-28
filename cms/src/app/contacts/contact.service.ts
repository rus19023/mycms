import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Subscription, Observable, throwError } from 'rxjs';

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
    contactSelectedEvent = new Subject<Contact>();
    contactListChangedEvent = new Subject<Contact[]>();
    //contact: Contact;
    private contactList: Contact[];
    maxContactId: number;   
    subscription: Subscription;
    configUrl: string = 'https://bonniesites-solutions-cms-default-rtdb.firebaseio.com/dcontacts.json';

    constructor(
        private msgService: MessageService,
        private http: HttpClient
        ) 
        {         
            this.maxContactId = this.getMaxId();
        } 



        fetchContacts() {
            return this.http
            .get<Contact[]>(this.configUrl)     
            .subscribe(
                // success method
                (contacts: Contact[] ) =>  { 
                    console.log(`contacts, inside subscribe, docService, fetchContacts, success: ${contacts}`);               
                    this.contactList = contacts;
                    console.log(`this.dcontactList, inside subscribe, docService, fetchDcontacts, success: ${this.contactList}`);   
                    this.maxContactId = this.getMaxId();
                    //sort the list of dcontacts
                    this.contactList.sort((a, b) => {
                        if (a > b) {
                        return 1;
                        } else { 
                        return -1;
                        }
                    });
                    //console.log(`this.dcontactList: ${this.dcontactList}`);
                    //emit the next dcontact list change event
                    let contactsListClone = this.contactList.slice(); 
                    //console.log(`dcontactsListClone, inside subscribe, docService, fetchDcontacts, success: ${contactsListClone}`);    
                    this.contactListChangedEvent.next(contactsListClone);
                },  
                // error method
                (error: any) => {
                //print the error to the console
                console.log(error)
                }
            )}  
    
        storeContacts() {       
            const dcontacts = this.contactList;
            this.http
            .put(
                this.configUrl
                , dcontacts
                , httpOptions
            )
            .subscribe(response => {
                console.log(response);
            });       
        }
    

    getMaxId(): number {
        let maxId = 0;
        this.contactList.forEach(element => {
           let currentId = element.id;
           //console.log(`element.id: ${element.id}`)
           if (currentId > maxId) {
              maxId = currentId;
           }
        }); 
        return maxId;
    }

    getContact(index: number) {
        return this.contactList[index];
    }

    getContacts() {
        return this.contactList.slice();
    } 

    addContact(newContact: Contact) {
        if (!newContact) {
            console.log('No dcontact info received.');
            return;
        } else {
            this.maxContactId++;
            newContact.id = this.maxContactId;  
            this.contactList.push(newContact);
            let contactsListClone = this.contactList.slice()
            this.contactListChangedEvent.next(contactsListClone);
        }
    }

    updateContact(originalContact: Contact, newContact: Contact) { 
        console.log('inside updateContact, line 70');
        // Check for missing dcontact information
        if (!originalContact || !newContact) {
            console.log('No contact info received.');
            return;
        } 
        let pos = this.contactList.indexOf(originalContact);
        if (pos < 0) {
            console.log('Invalid contact info.');
            return;
        }      
        newContact.id = originalContact.id;
        this.contactList[pos] = newContact;
        let contactsListClone = this.contactList.slice();
        this.contactListChangedEvent.next(contactsListClone);
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
        this.contactListChangedEvent.next(this.contactList.slice());
    }

}
