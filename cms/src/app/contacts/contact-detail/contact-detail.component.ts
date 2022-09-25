import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contacts: Contact[] = [
    new Contact(1, 'R. Kent Jackson','jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', []),
  new Contact(2, 'Rex Barzee','barzeer@byui.edu', '208-496-3768', '../../assets/images/barzeer.jpg', [])
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
