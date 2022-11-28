import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Subscription, Observable, throwError } from 'rxjs';

import { Document } from './document.model';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
      //, Authorization: 'my-auth-token'
    })
};

@Injectable({ providedIn: 'root' })

export class DocumentService implements OnInit, OnDestroy {
    private documentList: Document[] = [];
    documentSelected = new Subject<Document>();
    documentListChangedEvent = new Subject<Document[]>();
    maxDocumentId: number;    
    subscription: Subscription;
    configUrl: string = 'https://bonniesites-solutions-cms-default-rtdb.firebaseio.com/documents.json';
   
    constructor(
        private http: HttpClient
    ) {}

    ngOnInit(
    ) {}

    fetchDocuments() {
        return this.http
        .get<Document[]>(this.configUrl)     
        .subscribe(
            // success method
            (documents: Document[] ) =>  { 
                console.log(`documents, inside subscribe, docService, fetchDocuments, success: ${documents}`);               
                this.documentList = documents;
                console.log(`this.documentList, inside subscribe, docService, fetchDocuments, success: ${this.documentList}`);   
                this.maxDocumentId = this.getMaxId();
                //sort the list of documents
                this.documentList.sort((a, b) => {
                    if (a > b) {
                    return 1;
                    } else { 
                    return -1;
                    }
                });
                //console.log(`this.documentList: ${this.documentList}`);
                //emit the next document list change event
                let documentsListClone = this.documentList.slice(); 
                //console.log(`documentsListClone, inside subscribe, docService, fetchDocuments, success: ${documentsListClone}`);    
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
            console.log(response);
        });       
    }

    getDocument(index: number) {
        return this.documentList[index];
    }

    getMaxId(): number {
        let maxId = 0;
        this.documentList.forEach(element => {
            let currentId = element.id;
            console.log(`element.id: ${element.id}`)
            if (currentId > maxId) {
                maxId = currentId;
            }
         });
         return maxId;
    }

    addDocument(newDocument: Document) {
        if (!newDocument) {
            console.log('No document info received.');
            return;
        } else {
            this.maxDocumentId++;
            newDocument.id = this.maxDocumentId;  
            this.documentList.push(newDocument);
            this.storeDocuments();
        }
    }

    updateDocument(originalDocument: Document, newDocument: Document) { 
        // Check for missing document information
        if (!originalDocument || !newDocument) {
            console.log('No document update info received.');
           return;
        }   
        let pos = this.documentList.indexOf(originalDocument);
        if (pos < 0) {
            console.log('Invalid update document info.');
            return;
        }      
        newDocument.id = originalDocument.id;
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

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}

