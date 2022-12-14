import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit, OnDestroy {
  @Input() document!: Document;
  @Input() index: number;
  subscription: Subscription;

  constructor(private docService: DocumentService) {}

  ngOnInit() {
    this.subscription = this.docService.documentSelected  
      .subscribe(
      (document: Document) => {
        this.document = document;   
        console.log(`this.document, docService, onInit: ${this.document}`);
      }
    );
    //console.log(`this.documents: ${this.documents}`);
    //this.index = this.document;
    // console.log(this.document.id);
    // console.log(this.document.dname);
    // console.log(this.document.description);
    // console.log(this.document.url);
    // console.log(this.document.children);    
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();      
  }

}
