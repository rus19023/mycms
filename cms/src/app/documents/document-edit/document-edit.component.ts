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
    id: number;
    editMode: boolean = false;

    constructor(
        private docService: DocumentService,
        private router: Router,
        private route: ActivatedRoute
        ) { }

    ngOnInit() {
        this.route.params
        .subscribe(
            (params: Params) => {
              // '+' converts string into number
              this.id = +params['id'];
              console.log(`document-edit, onInit, this.id: ${this.id}`)
              this.editMode = params['id'] != null;
              this.originalDocument = this.docService.getDocument(this.id);
              if (!this.originalDocument) {
                alert('Document not found!')
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
            this.id, 
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
            newDocument.id = this.docService.maxDocumentId;
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
