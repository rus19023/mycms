import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DndModule } from 'ng2-dnd';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
    selector: 'cms-contact-edit',
    templateUrl: './contact-edit.component.html',
    styleUrls: ['./contact-edit.component.css']
})

export class ContactEditComponent implements OnInit {
    originalContact: Contact;
    contact: Contact;
    groupContacts: Contact[] = [];
    index: number;
    editMode = false;
    simpleDrop: any = null;

    constructor(
        private contactService: ContactService,
        private router: Router,
        private route: ActivatedRoute
        ) { }

    ngOnInit() {
        this.route.params
        .subscribe(
            (params: Params) => {
                // '+' converts string into number
                this.index = +params['id'];

                console.log(`contact-edit, onInit line 36, this.index: ${this.index}`);

                // If the index isn't null, save edit mode as true
                this.editMode = params['id'] != null;
                
                // Get the contact at this index in the list
                this.originalContact = this.contactService.getContact(this.index);
                
                console.log(`contact-edit, ngOnInit, line 44, this.originalContact.id, this.originalContact.cname: ${this.originalContact.id}, \n${this.originalContact.cname}`);

                if (!this.originalContact) {
                    alert('Contact not found!');
                    return;
                }

                this.editMode = true;
                this.contact = this.originalContact;

                console.log(`contact-edit, ngOnInit, line 54, this.contact.id: ${this.contact.id}`);

                console.log(`contact-edit, ngOnInit, line 56, this.originalContact.id: ${this.originalContact.id}`);

                // // Check for entries in group, if so, clone it
                // if (this.contact.group) {
                //     this.groupContacts = this.contact.group.slice();
                // }
            }
        );
    }

    onSubmit(form: NgForm) {
        // Get form object
        const value = form.value;
        
        console.log(`contact-edit, line 70, form value.email, value.cname: ${value.email}, ${value.cname}`);

        // Add form values to new contact object
        const newContact = new Contact(
            this.contactService.maxContactId
            ,value.cname 
            ,value.email 
            ,value.phone 
            ,value.imageUrl
            // If there are group members, add them, otherwise add empty list
            ,value.groupList || []
        );

        if (this.editMode) {
            newContact.id = this.originalContact.id;

            console.log(`****** contact-edit, onSubmit, line 86, this.originalContact.id, newContact.id: \n ${this.originalContact.id}, ${ newContact.id}`);

            // Save the updated into into the contact object
            this.contactService.updateContact(this.originalContact, newContact);
            this.router.navigate(['/contacts']);
        } else {
            // Create the new contact object
            this.contactService.addContact(newContact);
        }
        this.onCancel();
    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    isInvalidContact(newContact: Contact) {
        if (!newContact) {
            // newContact has no value
            return true;
        }
        if (this.contact && newContact.id === this.contact.id) {
            return true;
        }
        for (let i = 0; i < this.groupContacts.length; i++){
            if (newContact.id === this.groupContacts[i].id) {
                return true;
            }
        }
        return false;
    }

    addToGroup($event: any) {
        // Add group contact that was dragged and dropped
        // console.log('this.groupContacts: ');
        // console.log(JSON.stringify(this.groupContacts)); 

        const selectedContact: Contact = $event.dragData;

        // console.log(`contact-edit, addToGroup line 111, JSON.stringify(selectedContact): \n${JSON.stringify(selectedContact)}`); 

        const invalidGroupContact = this.isInvalidContact(selectedContact);
        if (invalidGroupContact){
            return;
        }
        this.groupContacts.push(selectedContact);

        //console.log(JSON.stringify(this.groupContacts)); 
    }
  
    onRemoveItem(index: number) {
        console.log(`contact-edit, onRemoveItem line 140, index: \n${index}`); 
        if (index < 0 || index >= this.groupContacts.length) {
            return;
        }
        console.log(`contact-edit, onRemoveItem line 140, index: \n${index}`); 
        this.groupContacts.splice(index, 1);
    }

}
