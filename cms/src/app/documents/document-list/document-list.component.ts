import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  subscription: Subscription;   

  constructor(
    private docService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.subscription = this.docService.documentListChangedEvent  
      .subscribe(
      (documentsList: Document[]) => {
          this.documents = documentsList;
      }
    );
    console.log(`this.documents: ${this.documents}`);
  }

  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
