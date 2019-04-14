import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_SEVERAL_INGREDIENTS = 'ADD_SEVERAL_INGREDIENTS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const DISABLE_EDIT_MODE = 'DISABLE_EDIT_MODE';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient) { }
}

export class AddSeveralIngredients implements Action {
    readonly type = ADD_SEVERAL_INGREDIENTS;
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
    AddIngredient |
    AddSeveralIngredients |
    DeleteIngredient |
    UpdateIngredient |
    SelectIngredient |
    DisableEditMode;
