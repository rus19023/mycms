import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
