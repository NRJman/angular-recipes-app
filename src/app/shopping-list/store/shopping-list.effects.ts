import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ShoppingListActions from './shopping-list.actions';
import * as fromRecipes from './../../recipes/store/recipes.reducers';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable()
export class ShoppingListEffects {
    constructor(private actions$: Actions, private store$: Store<fromRecipes.FeatureState>) { }

    @Effect()
    addIngredients = this.actions$.pipe(
        ofType(ShoppingListActions.TRY_TO_ADD_INGREDIENTS),
        map((action: ShoppingListActions.TryToAddIngredients) => {
            return action.payload;
        }),
        withLatestFrom(this.store$.select('recipes')),
        switchMap(([id, recipes]: [number, fromRecipes.State]) => {
            const recipesState: unknown = recipes;

            return of({
                type: ShoppingListActions.ADD_INGREDIENTS,
                payload: (<fromRecipes.FeatureState>recipesState).recipes.recipesList[id].recipeIngredients
            });
        })
    );
}
