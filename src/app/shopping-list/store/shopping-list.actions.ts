import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const TRY_TO_ADD_INGREDIENTS = 'TRY_TO_ADD_INGREDIENTS';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const DISABLE_EDIT_MODE = 'DISABLE_EDIT_MODE';

export class TryToAddIngredients implements Action {
    readonly type = TRY_TO_ADD_INGREDIENTS;
    constructor(public payload: number) { }
}
export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) { }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
    constructor(public payload: number) { }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload: { id: number, name: string, amount: number }) { }
}

export class SelectIngredient implements Action {
    readonly type = SELECT_INGREDIENT;
    constructor(public payload: number) { }
}

export class DisableEditMode implements Action {
    readonly type = DISABLE_EDIT_MODE;
}

export type Actions =
    AddIngredients |
    DeleteIngredient |
    UpdateIngredient |
    SelectIngredient |
    DisableEditMode;
