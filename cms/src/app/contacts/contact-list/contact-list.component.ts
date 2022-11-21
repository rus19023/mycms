import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  contacts: Contact[];
  //@Input() index: number;
  subscription: Subscription; 
  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.subscription = this.contactService.contactChangedEvent  
      .subscribe(
      (contactsList: Contact[]) => {
          this.contacts = contactsList;
      }
    );
    console.log(`this.contacts: ${this.contacts}`);
    // Load the stored contacts
    this.contacts = this.contactService.getContacts();
  }   

}
