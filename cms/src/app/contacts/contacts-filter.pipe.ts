import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
     name: 'contactsFilter'
})

export class ContactsFilterPipe implements PipeTransform {

    transform(contacts: Contact[], term: string): any {
        let filteredContacts: Contact[] =[];  
        if (term && term.length > 0) {
            console.log(term);
            filteredContacts = contacts.filter(
                (contact:Contact) => contact.cname.toLowerCase().includes(term.toLowerCase())
            );
        }
        if (filteredContacts.length < 1) {
            alert('No contacts found');
            return contacts;
        }
        return filteredContacts;
    }

}
