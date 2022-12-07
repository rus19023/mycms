import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})

export class DocumentDetailComponent implements OnInit {
  document!: Document;
  index: number;
  nativeWindow: any;

  constructor(
    private docService: DocumentService,
    private router: Router, 
    private route: ActivatedRoute,
    private winRefService: WindRefService
    ) {      
        this.nativeWindow = this.winRefService.getNativeWindow();
      }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index = +params['id'];
          this.document = this.docService.getDocument(this.index);

          console.log(`this.index: ${this.index}`);
          console.log(`this.document.id: ${this.document.id}`);
          console.log(`this.document.dname: ${this.document.dname}`);
          console.log(`this.document.description: ${this.document.description}`);
          console.log(`this.document.url: ${this.document.url}`);
          console.log(`this.document.children: ${this.document.children}`);
      }
    )
  }

  onView() {
    if (this.document.url) {
      // Open new tab/window using the document URL
      this.nativeWindow.open(this.document.url);
    }
  }  

  onDelete() {
    this.docService.deleteDocument(this.document);
    // route back to the '/documents' URL
    this.router.navigate(['/documents']);
  }

}



