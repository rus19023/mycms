import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  id: number;
  editMode = false;

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
          //this.initForm();
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
      this.contactService.addContact(newContact);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  
  onRemoveItem(id: number) {
    console.log(id);
  }
  
  // private initForm() {
  //   let contactName = '';
  //   let contactImageUrl = '';
  //   let contactEmail = '';
  //   let contactPhone = '';
  //   let groupContacts = new FormArray([]);

  //   if (this.editMode) {
  //     const contact = this.contactService.getContact(this.id);
  //     contactName = contact.cname;
  //     contactEmail = contact.email;
  //     contactPhone = contact.phone;
  //     contactImageUrl = contact.imageUrl;
  //     if (contact['group']) {
  //       for (let item of contact.group) {
  //         groupContacts.push(
  //           new FormGroup({
  //             'name': new FormControl(contact.id, Validators.required)
  //           })
  //         );
  //       }
  //     }
  //   }

    // this.contactForm = new FormGroup({
    //   'name': new FormControl(contactName, Validators.required),
    //   'contactImageUrl': new FormControl(contactImageUrl, Validators.required),
    //   'email': new FormControl(contactEmail, Validators.required),
    //   'phone': new FormControl(contactPhone, Validators.required),
    //   'groupContacts': groupContacts
    // });
  // }

}
