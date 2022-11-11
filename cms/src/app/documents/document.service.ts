import { EventEmitter } from '@angular/core';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

export class DocumentService {
  documentSelected = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  private documents: Document[];

  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

   getDocuments() {
     return this.documents.slice();
   }

   getDocument(index: number) {
    return this.documents[index];
   }

   deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
 }
}
