import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})

export class ContactItemComponent implements OnInit, OnDestroy {
 @Input() contact: Contact;
 @Input() index: number;
 subscription: Subscription;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.subscription = this.contactService.contactSelected  
      .subscribe(
      (contact: Contact) => {
        this.contact = contact;   
        console.log(`this.contact, contactService, onInit: ${this.contact}`);
      }
    );
    //console.log(`this.contacts: ${this.contacts}`);
    //this.index = this.contact;
    // console.log(this.contact.id);
    // console.log(this.contact.dname);
    // console.log(this.contact.description);
    // console.log(this.contact.url);
    // console.log(this.contact.children);    
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();  
      
  }

}
