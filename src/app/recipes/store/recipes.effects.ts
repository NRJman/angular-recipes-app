import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromRecipes from './recipes.reducers';
import * as RecipesActions from './recipes.actions';
import { switchMap, map, tap, withLatestFrom, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipes.model';

@Injectable()
export class RecipesEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private http: HttpClient,
        private store$: Store<fromRecipes.FeatureState>
    ) { }

    @Effect()
    addRecipe = this.actions$.pipe(
        ofType(RecipesActions.ADD_RECIPE),
        switchMap(() => {
            return of({
                type: RecipesActions.NAVIGATE,
                payload: 'recipe-book'
            });
        })
    );

    @Effect()
    modifyRecipe = this.actions$.pipe(
        ofType(RecipesActions.MODIFY_RECIPE),
        switchMap(() => {
            return of({
                type: RecipesActions.NAVIGATE,
                payload: 'recipe-book'
            });
        })
    );

    @Effect()
    deleteRecipe = this.actions$.pipe(
        ofType(RecipesActions.DELETE_RECIPE),
        switchMap(() => {
            return of({
                type: RecipesActions.NAVIGATE,
                payload: 'recipe-book'
            });
        })
    );

    @Effect({
        dispatch: false
    })
    navigate = this.actions$.pipe(
        ofType(RecipesActions.NAVIGATE),
        map((action: RecipesActions.Navigate) => {
            return action.payload;
        }),
        tap((url: string) => {
            this.router.navigate([`/${url}`]);
        })
    );

    @Effect({
        dispatch: false
    })
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store$.select('recipes')),
        switchMap(([action, recipes]: [RecipesActions.StoreRecipes, fromRecipes.State]) => {
            const recipesList: unknown = recipes;

            return this.http.put(
                'https://angular-recipes-app-database.firebaseio.com/recipes.json',
                (<fromRecipes.FeatureState>recipesList).recipes.recipesList,
                { observe: 'events' }
            ).pipe(
                tap((message) => {
                    console.log('The recipes were stored on a server: \n', message);
                }),
                catchError((error) => {
                    console.log('Error is handled in a service!');
                    return throwError('Here is an error: SOMETHING WENT WRONG!');
                })
            );
        })
    );

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>('https://angular-recipes-app-database.firebaseio.com/recipes.json', {
                observe: 'body',        // here is just to show how to
                responseType: 'json'   // use request configuration object
            }).pipe(
                map((recipes: Recipe[]) => {
                    for (const recipe of recipes) {
                        if (!recipe.recipeIngredients) {
                            recipe.recipeIngredients = [];
                        }
                    }

                    return recipes;
                }),
                switchMap((recipes: Recipe[]) => {
                    console.log('The recipes were fetched from a server.');

                    return of({
                        type: RecipesActions.RESET_RECIPES,
                        payload: recipes
                    });
                }),
                catchError(() => {
                    console.log('Error is handled in a service!');
                    return throwError('Here is an error: SOMETHING WENT WRONG!');
                })
            );
        })
    );
}
