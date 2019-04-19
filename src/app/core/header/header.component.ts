import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesServerService } from '../../shared/recipes-server.service';
import { RecipesService } from '../../recipes/recipes.service';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import * as fromApp from 'src/app/store/app.reducers';
import * as fromAuth from 'src/app/auth/store/auth.reducers';
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
        private recipesServerService: RecipesServerService,
        private recipesService: RecipesService,
        private router: Router,
        public store: Store<fromApp.State>
    ) { }

    onSaveData() {
        this.recipesServerService.saveRecipes().subscribe(
            (response: HttpEvent<Object>) => {
                console.log(response.type === HttpEventType.Sent);
            }
        );
    }

    onFetchData() {
        const recipesServiceCopy = this.recipesService;

        this.recipesServerService.getRecipes().subscribe((data) => {
            recipesServiceCopy.recipesList = data;
            recipesServiceCopy.updateRecipesList.next(recipesServiceCopy.recipesList);
        });
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
