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
    id: number;
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
                this.id = +params['id'];
                console.log(`contact-edit, onInit line 35, this.id: ${this.id}`)
                this.editMode = params['id'] != null;
                this.originalContact = this.contactService.getContact(this.id);
                // var me = arguments.callee.toString();
                // me = me.substr('function '.length);
                // me = me.substr(0, me.indexOf('('));
                // alert(me);
                console.log(`contact-edit, ngOnInit, line 37, this.originalContact: ${this.originalContact.id}, \n${this.originalContact.cname}`);
                if (!this.originalContact) {
                    alert('Contact not found!')
                    return;
                }
                this.editMode = true;
                this.contact = this.originalContact;
                console.log(`contact-edit, ngOnInit, line 43, this.contact.id: ${this.contact.id}`);
                console.log(`contact-edit, ngOnInit, line 44, this.originalContact.id: ${this.originalContact.id}`);
                // // Check for entries in group, if so, clone it
                // if (this.contact.group) {
                //     this.groupContacts = this.contact.group.slice();
                // }
            }
        );
    }

    onSubmit(form: NgForm) {
        // Collect form object
        const value = form.value;
        console.log(`value: ${value.email}, ${value.cname}`);
        // Add form and maxId values to new contact object
        const newContact = new Contact(
            this.id 
            ,value.cname 
            ,value.email 
            ,value.phone 
            ,value.imageUrl
            // If there are group members, add them, otherwise add empty list
            ,value.groupContacts || []
        );
        if (this.editMode) {
            // Save the updated into into the contact object
            this.contactService.updateContact(this.originalContact, newContact);
            this.router.navigate(['/contacts']);
        } else {
            // Get next consecutive id number
            newContact.id = this.contactService.maxContactId;
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
        console.log('this.groupContacts: ');
        console.log(JSON.stringify(this.groupContacts));  
        const selectedContact: Contact = $event.dragData;
        console.log(`contact-edit, addToGroup line 111, JSON.stringify(selectedContact): \n${JSON.stringify(selectedContact)}`);  
        const invalidGroupContact = this.isInvalidContact(selectedContact);
        if (invalidGroupContact){
            return;
        }
        this.groupContacts.push(selectedContact);
        console.log(JSON.stringify(this.groupContacts)); 
    }
  
    onRemoveItem(index: number) {
        if (index < 0 || index >= this.groupContacts.length) {
            return;
        }
        this.groupContacts.splice(index, 1);
    }

}
