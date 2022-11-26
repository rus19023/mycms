import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DndModule } from 'ng2-dnd';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  contacts: Contact[];
  index: number;
  subscription: Subscription;
  simpleDrop: any = null;
  term: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    // Load the stored contacts
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent  
      .subscribe(
      (contactsList: Contact[]) => {
          this.contacts = contactsList;
      }
    );
    //console.log(`this.contacts: ${this.contacts}`);
  }  

  onNewContact() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  } 

  search(value: string) {
    this.term = value;
  }
    
  // https://bonniesites-solutions-cms-default-rtdb.firebaseio.com/

}
