import * as ShoppingListActions from './shopping-list.actions';
import * as ShoppingListActionHandlers from './shopping-list.action-handlers';
import { Ingredient } from 'src/app/shared/ingredient.model';

export interface State {
    ingredientsList: Ingredient[];
    selectedIngredient: Ingredient;
    isEditMode: boolean;
}

const initialState: State = {
    ingredientsList: [
        new Ingredient('Tomatoes', 5),
        new Ingredient('Eggs', 3)
    ],
    selectedIngredient: null,
    isEditMode: false
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.Actions) {
    const ingredientsList = state.ingredientsList.slice();

    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredientsList: ShoppingListActionHandlers.handleIngredientAdding(ingredientsList, action.payload)
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredientsList: ShoppingListActionHandlers.handleIngredientDeleting(ingredientsList, action.payload),
                selectedIngredient: null,
                isEditMode: false
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            return {
                ...state,
                ingredientsList: ShoppingListActionHandlers.handleIngredientUpdate(ingredientsList, action.payload),
                selectedIngredient: null,
                isEditMode: false
            };
        case ShoppingListActions.SELECT_INGREDIENT:
            return {
                ...state,
                selectedIngredient: ShoppingListActionHandlers.handleIngredientSelecting(ingredientsList, action.payload),
                isEditMode: true
            };
        case ShoppingListActions.DISABLE_EDIT_MODE:
            return {
                ...state,
                selectedIngredient: null,
                isEditMode: false
            };
        default:
            return state;
    }
}
