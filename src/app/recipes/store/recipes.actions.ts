import { Action } from '@ngrx/store';
import { Recipe } from '../recipes.model';

export const SELECT_RECIPE = 'SELECT_RECIPE';
export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const MODIFY_RECIPE = 'MODIFY_RECIPE';
export const START_MOVING_TO_SHOPPING_LIST = 'START_MOVING_TO_SHOPPING_LIST';
export const NAVIGATE = 'NAVIGATE';
export const RESET_RECIPES = 'RESET_RECIPES';
export const STORE_RECIPES = 'STORE_RECIPES';
export const FETCH_RECIPES = 'FETCH_RECIPES';

export class SelectRecipe implements Action {
    readonly type = SELECT_RECIPE;
    constructor(public payload: number) { }
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe) { }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: number) { }
}

export class ModifyRecipe implements Action {
    readonly type = MODIFY_RECIPE;
    constructor(public payload: { id: number, newRecipeValue:  Recipe }) { }
}

export class Navigate implements Action {
    readonly type = NAVIGATE;
    constructor(public payload: string) { }
}

export class ResetRecipes implements Action {
    readonly type = RESET_RECIPES;
    constructor(public payload: Recipe[]) { }
}

export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES;
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export type Actions =
    SelectRecipe |
    AddRecipe |
    DeleteRecipe |
    ModifyRecipe |
    Navigate |
    ResetRecipes |
    StoreRecipes |
    FetchRecipes;
