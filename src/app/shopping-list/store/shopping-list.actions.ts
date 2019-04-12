import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_SEVERAL_INGREDIENTS = 'ADD_SEVERAL_INGREDIENTS';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient) { }
}

export class AddSeveralIngredients implements Action {
    readonly type = ADD_SEVERAL_INGREDIENTS;
    constructor(public payload: Ingredient[]) { }
}

export type Actions =
    AddIngredient |
    AddSeveralIngredients;
