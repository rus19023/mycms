import { Component, OnInit, Input } from '@angular/core';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Input() document!: Document;
  @Input() index: number;

  constructor(private docService: DocumentService) {
    console.log(this.document);
    //this.docService.documentListChangedEvent.next(this.document);
   }

  ngOnInit() {    
  }

}
