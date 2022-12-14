import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
    selector: 'cms-contact-detail',
    templateUrl: './contact-detail.component.html',
    styleUrls: ['./contact-detail.component.css']
})

export class ContactDetailComponent implements OnInit {
    contact: Contact;
    index: number;
    

    constructor(
        private contactService: ContactService,
        private router: Router, 
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params
          .subscribe(
            (params: Params) => {
                this.index = params['id'];
                this.contact = this.contactService.getContact(this.index);
                // console.log(`this.params['id']->this.index: ${this.index}`);
                // console.log(`this.contact.id: ${this.contact.id}`);
                // console.log(`this.contact.cname: ${this.contact.cname}`);
                // console.log(`this.contact.email: ${this.contact.email}`);
                // console.log(`this.contact.phone: ${this.contact.phone}`);
                // console.log(`this.contact.group: ${this.contact.group}`);
            }
        )
    }

    onDeleteContact() {
        this.contactService.deleteContact(this.contact);
        // route back to the '/contacts' URL
        this.router.navigate(['/contacts']); 
        // This will work with more detailed routes as per this example
        // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});   
    }

}
