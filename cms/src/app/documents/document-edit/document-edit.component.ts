import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { DocumentService } from '../document.service';
import { NgForm } from '@angular/forms'
import { Document } from '../document.model';

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
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          // '+' converts string into number
          this.id = +params['id'];
          this.editMode = params['id'] != null;
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(
      this.id, 
      value.dname, 
      value.description, 
      value.url,
      []
    );
    this.docService.addDocument(newDocument);
  }

  onCancel() {
    console.log(this.id);
  }

}
