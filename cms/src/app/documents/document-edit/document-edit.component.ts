import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
    selector: 'cms-document-edit',
    templateUrl: './document-edit.component.html',
    styleUrls: ['./document-edit.component.css']
})

export class DocumentEditComponent implements OnInit {
    originalDocument: Document;
    document: Document;
    index: number;
    editMode: boolean = false;
    childrenDocuments: Document[] = [];


    constructor(
        private docService: DocumentService,
        private router: Router,
        private route: ActivatedRoute
        ) {}

    ngOnInit() {
        this.route.params
        .subscribe(
            (params: Params) => {
              // '+' converts string into number
              this.index = +params['id'];
              this.editMode = params['id'] != null;
                
              // Get the document at this index in the list
              this.originalDocument = this.docService.getDocument(this.index);
              if (!this.originalDocument) {
                  return;
              }
              this.editMode = true;
              this.document = this.originalDocument;
            }
        );
    }

    onSubmit(form: NgForm) {
        // Collect form object
        const value = form.value;
        // Add values to new contact object
        //console.log(value);
        const newDocument = new Document(
            this.docService.maxDocumentId, 
            value.dname, 
            value.description, 
            value.url,
            // If there are child documents, add them, otherwise add empty list
            value.children || []
        );
        if (this.editMode) { 
            // Save the updated into into the contact object     
            this.docService.updateDocument(this.originalDocument, newDocument);
            alert('Document updated!');
            this.router.navigate(['/documents']);
        } else {
          // Get next consecutive id number
            newDocument.id = this.docService.maxDocumentId++;
            // Create the new document object
            this.docService.addDocument(newDocument);
            alert('Document added!');
            this.router.navigate(['/documents']);
        }
    }

    onCancel() {
        this.router.navigate(['/documents']);
    }

}
