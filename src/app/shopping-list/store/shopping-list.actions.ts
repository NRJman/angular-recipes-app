import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_SEVERAL_INGREDIENTS = 'ADD_SEVERAL_INGREDIENTS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

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

export type Actions =
    AddIngredient |
    AddSeveralIngredients |
    DeleteIngredient;
