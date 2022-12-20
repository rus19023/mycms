import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Document } from './document.model';

@Injectable({ providedIn: 'root' })

export class DocumentService implements OnInit {
    private documentList: Document[] = [];
    documentSelected = new Subject<Document>();
    documentListChangedEvent = new Subject<Document[]>();
    configUrl: string = 'http://localhost:3333/documents';
   
    constructor(private http: HttpClient) {
    }

    ngOnInit(): void { 
    }

    getDocuments() {
        this.http
        .get(this.configUrl, {responseType: 'text'})
        .subscribe(
            (documents: any) => {
                console.log(documents);
                this.documentList = documents;
                this.sortAndSend();
            },
            // error method
            (error: any) => {
                //print the error to the console
                console.error(error);
            }
        );
    }    

    getDocument(index: number) {
        return this.documentList[index];
    }

    getDocumentById(id: string) {
        return this.documentList.findIndex(document => document.id === id);
    }
    
    sortAndSend() {
        this.documentList.sort((a: Document, b: Document) => {
            if (a < b) return -1;
            else if (a > b) return 1;
            else return 0;
        });
        const clonedDocuments = this.documentList.slice()
        this.documentListChangedEvent.next(clonedDocuments);
    }

    storeDocuments() { 
        const documentsToSave = JSON.stringify(this.documentList.slice());
        let httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        this.http
          .put(this.configUrl,
            documentsToSave
          )
          .subscribe(() =>
            this.documentListChangedEvent.next(this.documentList.slice())
          );
    }

    addDocument(newDocument: Document) {
        if (!newDocument) {
            console.log('No document info received.');
            return;
        }         
        // make sure id of the new Document is empty
        newDocument.id = '';    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // add to database
        this.http.post<{ message: string, document: Document }>(this.configUrl,
            document,
            { headers: headers })
          .subscribe(
            (responseData) => {
                // add new document to documents
                this.documentList.push(responseData.document);
                this.storeDocuments();
            }
        );
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) {
            return;
        }
    
        const pos = this.documentList.findIndex(d => d.id === originalDocument.id);
    
        if (pos < 0) {
            return;
        }
    
        // set the id of the new Document to the id of the old Document
        newDocument.id = originalDocument.id;
        //newDocument._id = originalDocument._id;
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // update database
        this.http.put(this.configUrl + originalDocument.id,
            newDocument, { headers: headers })
            .subscribe(
                (response) => {
                this.documentList[pos] = newDocument;
                this.storeDocuments();
                }
          );
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

