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
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredientsList: ShoppingListActionHandlers.handleIngredientAddition(ingredientsList, action.payload)
            };
        case ShoppingListActions.ADD_SEVERAL_INGREDIENTS:
            return {
                ...state,
                ingredientsList: ShoppingListActionHandlers.handleSeveralIngredientsAddition(ingredientsList, action.payload)
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredientsList: ShoppingListActionHandlers.handleIngredientDeletion(ingredientsList, action.payload)
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            return {
                ...state,
                ingredientsList: ShoppingListActionHandlers.handleIngredientUpdate(ingredientsList, action.payload)
            };
        case ShoppingListActions.SELECT_INGREDIENT:
            return {
                ...state,
                selectedIngredient: ShoppingListActionHandlers.handleIngredientSelection(ingredientsList, action.payload),
                isEditMode: true
            };
        default:
            return state;
    }
}
