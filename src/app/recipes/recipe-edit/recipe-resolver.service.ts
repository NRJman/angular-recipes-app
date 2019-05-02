import { Recipe } from './../recipes.model';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as fromRecipes from './../store/recipes.reducers';
import { Store } from '@ngrx/store';
import { map, take, switchMap } from 'rxjs/operators';
import { getRecipesState, getRecipeValueAndId } from '../store/recipes.selectors';

interface ResolverData {
    value: Recipe;
    id: number;
}

@Injectable({
    providedIn: 'root'
})
export class RecipeResolver implements Resolve<ResolverData> {
    constructor(private store$: Store<fromRecipes.FeatureState>) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ResolverData> | Promise<ResolverData> | ResolverData {
        return this.store$.select(getRecipeValueAndId(+route.params['id'])).pipe(
            take(1)
        );
    }
}
