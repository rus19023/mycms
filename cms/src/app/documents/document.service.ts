import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Document } from './document.model';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
      //, Authorization: 'my-auth-token'
    })
};

@Injectable({ providedIn: 'root' })

export class DocumentService {
    private documentList: Document[] = [];
    documentSelected = new Subject<Document>();
    documentListChangedEvent = new Subject<Document[]>();
    maxDocumentId: number;
    configUrl: string = 'https://bonniesites-solutions-cms-default-rtdb.firebaseio.com/documents.json';
   
    constructor(
        private http: HttpClient
    ) {}

    fetchDocuments() {
        return this.http
        .get<Document[]>(this.configUrl)     
        .subscribe(
            // success method
            (documents: Document[] ) =>  {              
                this.documentList = documents;
                this.maxDocumentId = this.getMaxId();
                //sort the list of documents
                this.documentList.sort((a, b) => {
                    if (a.dname > b.dname) {
                    return 1;
                    } else { 
                    return -1;
                    }
                });
                // Create a copy of the documents list
                let documentsListClone = this.documentList.slice(); 
                // Send the documents list copy to the next listener   
                this.documentListChangedEvent.next(documentsListClone);
            },  
            // error method
            (error: any) => {
            //print the error to the console
            console.log(error)
            }
        )}  

    storeDocuments() {       
        const documents = JSON.stringify(this.documentList);
        this.http
        .put(
            this.configUrl
            , documents
            , httpOptions
        )
        .subscribe(response => {
            console.log(`response: ${response}`);
        });       
    }

    getMaxId(): number {
        let maxId = 0;
        this.documentList.forEach(element => {
            let currentId = element.id;
            if (currentId > maxId) {
                maxId = currentId;
            }
         });
         return maxId;
    }

    getDocument(index: number) {
        return this.documentList[index];
    }

    addDocument(newDocument: Document) {
        if (!newDocument) {
            console.log('No document info received.');
            return;
        } else {
            this.documentList.push(newDocument);
            console.log('Document added!');
            this.storeDocuments();
        }
    }

    updateDocument(originalDocument: Document, newDocument: Document) { 
                
        // Check for missing document information
        if (!originalDocument || !newDocument) {
            console.log('Document info missing.');
            return;
        }        
        // Get index of the original document to replace it with the updated object
        let pos = this.documentList.indexOf(originalDocument);

        // Console log originalDocument info
        console.log(`updateDocument, \n originalDocument ${originalDocument}`);

        if (pos < 0) {
            console.log('Invalid update info.');
            return;
        }      
        newDocument.id = originalDocument.id;
        console.log(`Document.service, inside updateDocument, line 114, \n newDocument.id ${newDocument.id},\n originalDocument = ${originalDocument.id}, ${originalDocument.dname}, ${originalDocument.description}, ${originalDocument.url}, ${originalDocument.children}`);
        this.documentList[pos] = newDocument;
        this.storeDocuments();
    }

    deleteDocument(document: Document) {
        if (!document) {
            console.log('No document delete info received.');
            return;
        }
        const pos = this.documentList.indexOf(document);
        if (pos < 0) {
            console.log('Invalid document id.');
            return;
        } 
        this.documentList.splice(pos, 1);
        this.storeDocuments();
    }
}

