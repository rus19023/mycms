import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
    selector: 'cms-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit, OnDestroy {
    contacts: Contact[] = [];
    fetchContacts: Subscription;
    maxContactId: number;   
    simpleDrop: any = null;
    term: string;

    constructor(
        private contactService: ContactService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        // Load contacts from firebase
        this.fetchContacts = this.contactService.fetchContacts();
        this.contactService.contactListChangedEvent  
            .subscribe(
            (contactsList: Contact[]) => {
                this.contacts = contactsList;
            }
        );
    }  

    onNewContact() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    ngOnDestroy() {
        this.fetchContacts.unsubscribe();
    } 

    search(value: string) {
        this.term = value.trim();
    }
}
