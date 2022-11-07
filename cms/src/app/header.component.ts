import { Component } from '@angular/core';

    @Component({
      selector: 'cms-header',
      templateUrl: './header.component.html',
      styleUrls: ['./header.component.css']
    })
    export class HeaderComponent {
      navbarCollapsed = true;
    
      constructor() { }
    
      ngOnInit(): void {
      }
      
      toggleHambugah() {
        this.navbarCollapsed = !this.navbarCollapsed;
    }
    
}
