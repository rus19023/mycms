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
  id: number;
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
          this.id = +params['id'];
          this.document = this.docService.getDocument(this.id);
          console.log(`this.id: ${this.id}`);
      }
    )
  }

  onView() {
    if (this.document.url) {
      console.log(this.document.url);
      this.nativeWindow.open(this.document.url);
    }
  }  

  onDeleteDocument() {
    this.docService.deleteDocument(this.document);
    // route back to the '/documents' URL
    this.router.navigate(['/documents']);
  }

}



