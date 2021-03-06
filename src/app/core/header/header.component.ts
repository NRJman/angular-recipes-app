import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import * as fromApp from 'src/app/store/app.reducers';
import * as fromAuth from 'src/app/auth/store/auth.reducers';
import * as RecipesActions from './../../recipes/store/recipes.actions';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { StartSignOut } from 'src/app/auth/store/auth.actions';
import { trigger } from '@angular/animations';
import { navbarCollapseAnimation } from './header.animations';
import { getAuthState } from 'src/app/auth/store/auth.selectors';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    animations: [navbarCollapseAnimation]
})
export class HeaderComponent implements OnInit, OnDestroy {
    public authState: Observable<fromAuth.State> = <Observable<fromAuth.State>>this.store.select(getAuthState);
    public isAuthenticated: boolean;
    private isAuthenticatedSubscription: Subscription;
    private navbarState: string;

    constructor(
        public store: Store<fromApp.State>
    ) { }

    onSaveData() {
        this.store.dispatch(new RecipesActions.StoreRecipes());
    }

    onFetchData() {
        this.store.dispatch(new RecipesActions.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new StartSignOut());
    }

    onToggle(event: Event) {
        event.stopImmediatePropagation();
        this.navbarState = (this.navbarState === 'collapsed') ? 'expanded' : 'collapsed';
    }

    @HostListener('document:click', ['$event'])
    onDocumentCLick(event: Event) {
        const target = (<HTMLElement>event.target);

        if (!target.classList.contains('navbar') || target.classList.contains('nav-item')) {
            this.navbarState = 'collapsed';
        }
    }

    ngOnInit() {
        this.isAuthenticatedSubscription = this.authState.subscribe((authState: fromAuth.State) => {
            this.isAuthenticated = authState.isAuthenticated;
        });

        this.navbarState = 'collapsed';
    }

    ngOnDestroy() {
        this.isAuthenticatedSubscription.unsubscribe();
    }
}
