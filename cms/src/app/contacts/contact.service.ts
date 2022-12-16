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
    configUrl: string = 'http://localhost:3333/contacts';

    constructor(
        private http: HttpClient,
        private msgService: MessageService
    ) {
        this.http
      .get(this.configUrl)
      .subscribe(
        (data: any) => {
          this.contactList = data.contacts;
          //sort the list of contacts
          this.sortAndSend();
          //emit the next contact list change event
          this.contactListChangedEvent.next(this.contactList.slice());
        },
        // error method
        (error: any) => {
          //print the error to the console
          console.error(error);
        }
      );
    } 

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
    
    
    sortAndSend() {
        this.contactList.sort((a: Contact, b: Contact) => {
            if (a < b) return -1;
            else if (a > b) return 1;
            else return 0;
        });
        const clonedContacts = this.contactList.slice()
        this.contactListChangedEvent.next(clonedContacts);
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

    getContact(index: number) {
        return this.contactList[index];
    }

    getContactById(id: string) {
        return this.contactList.findIndex(contact => contact.id === id);
    }

    addContact(newContact: Contact) {
        if (!newContact) {
            console.log('No contact info received.');
            return;
        } 
        newContact.id = '';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        // add to database
        this.http
        .post<{ message: string; contact: Contact }>(this.configUrl,
            newContact,
            { headers: headers }
        )
        .subscribe((responseData) => {
            // add new contact to contacts
            this.contactList.push(responseData.contact);
            this.storeContacts();
        });
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        
        // Check for missing contact information
        if (!originalContact || !newContact) {
            console.log('Contact info missing.');
            return;
        }
        
        // Get index of the original contact to replace it with the updated object
        let pos = this.contactList.findIndex(contact => contact.id === originalContact.id);

        if (pos < 0) {
            console.log('Invalid update info.');
            return;
        } 
        newContact.id = originalContact.id;
        //newContact._id = originalContact._id;

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        // update database
        this.http.put('http://localhost:3000/contacts/' + originalContact.id,
        newContact, { headers: headers })
        .subscribe(
            (response) => {
            this.contactList[pos] = newContact;
            this.storeContacts();
            }
        );
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
        this.http.delete(this.configUrl + contact.id)
        .subscribe(
          (response) => {
            this.contactList.splice(pos, 1);
            this.storeContacts();
          }
        );
    }

}
