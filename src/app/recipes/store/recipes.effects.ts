import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as RecipesActions from './../store/recipes.actions';
import { switchMap, map, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class RecipesEffects {
    constructor(private actions$: Actions, private router: Router) { }

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
}
