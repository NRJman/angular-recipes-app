import { Recipe } from '../recipes.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ActionReducerMap } from '@ngrx/store';
import * as RecipesActions from './recipes.actions';
import * as RecipesActionHandlers from './recipes.action-handlers';
import * as fromApp from './../../store/app.reducers';
import { shoppingListReducer } from 'src/app/shopping-list/store/shopping-list.reducers';
import { authReducer } from 'src/app/auth/store/auth.reducers';

export interface FeatureState extends fromApp.State {
    recipes: State;
}

export const reducers: ActionReducerMap<FeatureState> = {
    recipes: recipesReducer,
    shoppingList: shoppingListReducer,
    auth: authReducer
};

export interface State {
    recipesList: Recipe[];
    selectedRecipe: Recipe;
}

export const initialState: State = {
    recipesList: [
        new Recipe('Tomatoes Soup',
            'A delicious soup with tomatoes and pepperoni',
            'https://www.maxpixel.net/static/photo/1x/Yellow-Come-Soup-Paprika-Bread-Creamy-Vegan-3262211.jpg',
            [
                new Ingredient('Mashroom', 5),
                new Ingredient('Cream', 7)
            ]
        ),
        new Recipe('Mashroom Cream Soup',
            'A tasty cream soup with mashrooms',
            'https://www.maxpixel.net/static/photo/1x/Yellow-Come-Soup-Paprika-Bread-Creamy-Vegan-3262211.jpg',
            [
                new Ingredient('Mashroom', 5),
                new Ingredient('Cream', 7)
            ]
        ),
    ],
    selectedRecipe: null
};

export function recipesReducer(state: State = initialState, action: RecipesActions.Actions): State {
    const recipesList = state.recipesList.slice();

    switch (action.type) {
        case RecipesActions.SELECT_RECIPE:
            return {
                ...state,
                selectedRecipe: RecipesActionHandlers.handleRecipeSelecting(recipesList, action.payload)
            };
        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipesList: RecipesActionHandlers.handleRecipeAddition(recipesList, action.payload)
            };
        case RecipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipesList: RecipesActionHandlers.handleRecipeDeletion(recipesList, action.payload)
            };
        case RecipesActions.MODIFY_RECIPE:
            return {
                ...state,
                recipesList: RecipesActionHandlers.handleRecipeModifying(recipesList, action.payload.id, action.payload.newRecipeValue)
            };
        default:
            return state;
    }
}
