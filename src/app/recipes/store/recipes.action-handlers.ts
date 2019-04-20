import { Recipe } from '../recipes.model';

export function handleRecipeSelecting(recipesList: Recipe[], id: number) {
    return recipesList[id];
}

export function handleRecipeAddition(recipesList: Recipe[], newRecipe: Recipe) {
    recipesList.push(newRecipe);

    return recipesList;
}

export function handleRecipeDeletion(recipesList: Recipe[], id: number) {
    recipesList.splice(id, 1);

    return recipesList;
}

export function handleRecipeModifying(recipesList: Recipe[], id: number, newRecipe: Recipe) {
    recipesList[id] = newRecipe;

    return recipesList;
}
