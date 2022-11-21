import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentService]
})
export class DocumentsComponent implements OnInit {
  selectedDocument!: Document;
  private docListChangedSub: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.documentSelected
      .subscribe(
        (document: Document) => {
          this.selectedDocument = document;
        }
      );
  }

  ngOnDestroy(): void {
    this.docListChangedSub.unsubscribe();
  }

}
