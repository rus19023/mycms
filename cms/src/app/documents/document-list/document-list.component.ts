import { Component, OnInit, OnDestroy} from '@angular/core';
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
  fetchDocs: Subscription;
  maxDocumentId: number;   

  constructor(
    private docService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    // Load documents from firebase to Observable
    this.fetchDocs = this.docService.fetchDocuments();
    // Get the document list and save in class
    this.docService.documentListChangedEvent  
      .subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
      }
    ); 
  }

  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.fetchDocs.unsubscribe();
  }

}
