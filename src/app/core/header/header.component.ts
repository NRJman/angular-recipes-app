import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from 'src/app/store/app.reducers';
import * as fromAuth from 'src/app/auth/store/auth.reducers';
import * as RecipesActions from './../../recipes/store/recipes.actions';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { StartSignOut } from 'src/app/auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public authState: Observable<fromAuth.State> = this.store.select('auth');
    public isAuthenticated: boolean;
    private isAuthenticatedSubscription: Subscription;

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

    ngOnInit() {
        this.isAuthenticatedSubscription = this.authState.subscribe((authState: fromAuth.State) => {
            this.isAuthenticated = authState.isAuthenticated;
        });
    }

    ngOnDestroy() {
        this.isAuthenticatedSubscription.unsubscribe();
    }
}
