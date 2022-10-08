import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(1, 'Week04 Assignment','WDD430 Instructions for Week04 Assignment', '../../assets/documents/wk04.pdf', []),
    new Document(1, 'Week03 Submission','WDD430 Submission for Week03 Assignment', '../../assets/documents/wk03sub.pdf', [])
  ];

  constructor() {}

  ngOnInit(): void {
  }

  onDocumentSelected(document: Document) {
   this.selectedDocumentEvent.emit(document);
  }

}
