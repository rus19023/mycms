import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactNewComponent } from './contacts/contact-new/contact-new.component';

import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';

import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactsComponent, children: [
    { path: '', component: ContactsComponent },
    { path: 'new', component: ContactNewComponent },
    { path: ':id', component: ContactDetailComponent },
    { path: ':id/edit', component: ContactNewComponent },
  ] },
  { path: 'documents', component: DocumentsComponent , children: [
    { path: '', component: DocumentListComponent },
    { path: 'new', component: DocumentEditComponent },
    { path: ':id', component: DocumentDetailComponent },
    { path: ':id/edit', component: DocumentEditComponent },
  ] },
    { path: 'messages', component: MessageListComponent , children: [
    { path: '', component: MessageListComponent },
    { path: 'new', component: MessageEditComponent },
    { path: ':id', component: MessageItemComponent },
    { path: ':id/edit', component: MessageEditComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
