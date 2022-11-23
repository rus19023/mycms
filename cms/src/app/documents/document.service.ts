import { Subject } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

export class DocumentService {
  documentSelected = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[];
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }

   getDocuments() {
     return this.documents.slice();
   }

   getDocumentId(index: number) {
    return this.documents[index];
   }

   getMaxId(): number {
      let maxId = 0;
      this.documents.forEach(element => {
         let currentId = element.id;
         console.log(`element.id: ${element.id}`)
         if (currentId > maxId) {
            maxId = currentId;
         }
      });  
      console.log(`maxId: ${maxId}`);
      return maxId;
   }

   addDocument(newDocument: Document) {
      if (!newDocument) {
         console.log('No document info received.');
         return;
      } else {
         this.maxDocumentId++;
         newDocument.id = this.maxDocumentId;  
         this.documents.push(newDocument);
         let documentsListClone = this.documents.slice()
         this.documentListChangedEvent.next(documentsListClone);
      }
   }

   updateDocument(originalDocument: Document, newDocument: Document) { 
      // Check for missing document information
      if (!originalDocument || !newDocument) {
         console.log('No document info received.');
         return;
      }
      let pos = this.documents.indexOf(originalDocument);
      if (pos < 0) {
         console.log('Invalid document info.');
         return;
      }      
      newDocument.id = originalDocument.id;
      this.documents[pos] = newDocument;
      let documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(documentsListClone);
   }

   deleteDocument(document: Document) {
      if (!document) {
         console.log('No document info received.');
         return;
      }
      const pos = this.documents.indexOf(document);
      if (pos < 0) {
         console.log('Invalid document id.');
         return;
      }
      this.documents.splice(pos, 1);
      let documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(documentsListClone);
   }
}

