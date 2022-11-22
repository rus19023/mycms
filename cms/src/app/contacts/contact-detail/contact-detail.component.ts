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
  id: number;
  

  constructor(
    private contactService: ContactService,
    private router: Router, 
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.contact = this.contactService.getContactByID(this.id);
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
