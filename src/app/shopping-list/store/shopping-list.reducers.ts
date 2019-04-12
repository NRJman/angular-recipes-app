import * as ShoppingListActions from './shopping-list.actions';
import * as ShoppingListActionHandlers from './shopping-list.action-handlers';
import { Ingredient } from 'src/app/shared/ingredient.model';

const initialState = {
    ingredientsList: [
        new Ingredient('Tomatoes', 5),
        new Ingredient('Eggs', 3)
    ]
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.Actions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredientsList: ShoppingListActionHandlers.handleIngredientAddition(state.ingredientsList.slice(), action.payload)
            };
        case ShoppingListActions.ADD_SEVERAL_INGREDIENTS:
            return {
                ...state,
                ingredientsList: ShoppingListActionHandlers.handleSeveralIngredientsAddition(state.ingredientsList.slice(), action.payload)
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredientsList: ShoppingListActionHandlers.handleIngredientDeletion(state.ingredientsList.slice(), action.payload)
            };
        default:
            return state;
    }
}
