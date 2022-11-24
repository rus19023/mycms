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
          this.editMode = params['id'] != null;
          this.originalContact = this.contactService.getContact(this.id);
          if (!this.originalContact) {
            return;
          }
          this.editMode = true;
          this.contact = this.originalContact;
          console.log(this.contact.id);
          console.log(this.originalContact.id);
          // Check for entries in group, if so, clone it
          if (this.contact.group) {
            //groupContacts = clone the contact’s group
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      this.id, 
      value.cname, 
      value.email, 
      value.phone, 
      value.imageUrl,
      []
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.id = this.contactService.maxContactId;
      this.contactService.addContact(newContact);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {// newContact has no value
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
    console.log('this.groupContacts: ');
    console.log(JSON.stringify(this.groupContacts));  
    const selectedContact: Contact = $event.dragData;
      console.log(JSON.stringify(selectedContact));  
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
