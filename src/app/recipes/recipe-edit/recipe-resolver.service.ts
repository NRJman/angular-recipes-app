import { Recipe } from './../recipes.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as fromRecipes from './../store/recipes.reducers';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

interface ResolverData {
    value: Recipe;
    id: number;
}

@Injectable({
    providedIn: 'root'
})
export class RecipeResolver implements Resolve<ResolverData> {
    constructor(private store$: Store<fromRecipes.FeatureState>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolverData> | Promise<ResolverData> | ResolverData {
        return this.store$.select('recipes').pipe(
            map((recipes: fromRecipes.State) => {
                const recipesState: unknown = recipes;

                return {
                    value: (<fromRecipes.FeatureState>recipesState).recipes.recipesList[+route.params['id']],
                    id: +route.params['id']
                };
            }),
            take(1)
        );
    }
}
