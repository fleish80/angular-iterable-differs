import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
    selector: 'angular-iterable-differs-root',
    template: `
        <nav class="nav">
            <a routerLink="/iterable-differs">Iterable Differs</a>
            <a routerLink="/employees">Employees</a>
            <a routerLink="/my-ng-style">My Ng Style</a>
        </nav>
        <router-outlet/>`,
    styles: [`
    .nav {
        display: flex;
        gap: 10px;
    }
    `],
    imports: [
        RouterOutlet,
        RouterLink
    ],
    standalone: true
})
export class AppComponent {
    title = 'angular-iterable-differs';
}
