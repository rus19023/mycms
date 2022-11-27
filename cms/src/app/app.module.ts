import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';

// Contacts
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';

// Documents
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';

// Messages
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';

// Header & Footer
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer/footer.component';

// Directives
import { DropdownDirective } from './shared/dropdown.directive';

import { MessageService } from './messages/message.service';
import { ContactService } from './contacts/contact.service';
import { DocumentService } from './documents/document.service';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import { SortPipe } from './shared/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    ContactEditComponent,
    DocumentListComponent,
    DocumentDetailComponent,
    DocumentItemComponent,
    DocumentEditComponent,
    DocumentsComponent,
    MessageListComponent,
    MessageItemComponent,
    MessageEditComponent,
    FooterComponent,
    DropdownDirective,
    ContactsFilterPipe,
    SortPipe

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    AppRoutingModule,
    DndModule.forRoot()
  ],
  providers: [ContactService, MessageService, DocumentService],
  bootstrap: [AppComponent],
  exports: [
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    DocumentEditComponent,
    DocumentItemComponent,
    ContactEditComponent,
    MessageItemComponent
    
  ]
})
export class AppModule {}
