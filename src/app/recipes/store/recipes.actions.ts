import { Action } from '@ngrx/store';
import { Recipe } from '../recipes.model';

export const SELECT_RECIPE = 'SELECT_RECIPE';
export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const MODIFY_RECIPE = 'MODIFY_RECIPE';
export const START_MOVING_TO_SHOPPING_LIST = 'START_MOVING_TO_SHOPPING_LIST';

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

export type Actions =
    SelectRecipe |
    AddRecipe |
    DeleteRecipe |
    ModifyRecipe;
