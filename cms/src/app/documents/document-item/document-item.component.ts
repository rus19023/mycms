import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Input() document!: Document;
  @Output() documentSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected() {
    this.documentSelected.emit();
  }

}
