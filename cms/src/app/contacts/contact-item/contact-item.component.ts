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
  }

  onSelected() {
    this.contactService.contactSelected.emit(this.contact);    
    //console.log(`this.contactService.contactSelected.cname: ${this.contactService.contactSelected}`)
  }

}
