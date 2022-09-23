import { Component } from "@angular/core";

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
    .online {
        color: white;
    }`

    ]

})
export class ServerComponent {
    serverId: number =  10;
    serverStatus: string = 'running';
    hide: boolean = false;

    constructor() {
        this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    }

    getServerStatus(): string {
        return this.serverStatus;
    }

    getHide(): boolean {
        return this.hide;
    }

    getColor(): string {
        return this.serverStatus === 'online' ? 'green' : 'red';
    }

    showHide(): string {
        return this.hide === false ? 'block' : 'transparent';
    }

    toggleHideJoke() {
        this.hide = !this.hide;
    }
}