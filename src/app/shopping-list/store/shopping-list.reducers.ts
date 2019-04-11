import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActionsModule from './shopping-list.actions';

const initialState = {
    ingredientsList: [
        new Ingredient('Tomatoes', 5),
        new Ingredient('Eggs', 3)
    ]
}

export function shoppingListReducer(state = initialState, action: ShoppingListActionsModule.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActionsModule.ADD_INGREDIENT:
            return {
                ...state,
                ingredientsList: [...state.ingredientsList, action]
            };

        default:
            return initialState;
    }
}
