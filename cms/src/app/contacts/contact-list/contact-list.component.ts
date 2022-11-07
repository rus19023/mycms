import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  contacts: Contact[];
  //@Input() index: number;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    // Load the stored contacts
    this.contacts = this.contactService.getContacts();
  }   

}
