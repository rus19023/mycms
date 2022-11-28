import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  //index: number;
  fetchDocs: Subscription;
  maxDocumentId: number;   

  constructor(
    private docService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.fetchDocs = this.docService.fetchDocuments();
    //this.getIndex = this.docService.getDocument();
    console.log(`this.documents, docService, onInit: ${this.documents}`);
    this.docService.documentListChangedEvent  
      .subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;   
        //console.log(`this.documents, docService, onInit: ${this.documents}`);
      }
    );
    //console.log(`this.documents: ${this.documents}`);
  }

  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.fetchDocs.unsubscribe();
  }

}
