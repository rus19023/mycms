import { Component, OnInit, Input } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
 @Input() contact: Contact;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    // // Collect the message data into the contact variable
    //   console.log(`this.contact: ${this.contact}`);
    // // get the sender id from message
    // this.contact = this.contactService.getContact(this.contact.id);
  }

  onSelected() {
    this.contactService.contactSelectedEvent.emit(this.contact);
  }

}
