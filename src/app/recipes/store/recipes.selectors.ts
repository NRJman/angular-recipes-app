import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRecipes from './recipes.reducers';
import { Observable } from 'rxjs';

export const getRecipesState = createFeatureSelector('recipes');

export const getRecipeValueAndId = (id: number) => {
    return createSelector(getRecipesState, (recipes: Observable<fromRecipes.State>) => {
        const recipesState: unknown = recipes;

        return {
            value: (<fromRecipes.FeatureState>recipesState).recipes.recipesList[id],
            id: id
        };
    });
};
