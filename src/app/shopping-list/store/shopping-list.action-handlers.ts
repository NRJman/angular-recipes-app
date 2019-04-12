import { Ingredient } from "src/app/shared/ingredient.model";

interface ShoppingListState {
    ingredientsList: Ingredient[]
}

export function handleIngredientAddition(currentState: ShoppingListState, ingredientToAdd: Ingredient): Ingredient[] {
    const ingredientsList = currentState.ingredientsList.slice(),
        indexOfFoundIngredient: number = ingredientsList.findIndex(
            (listIngredient) => listIngredient.name === ingredientToAdd.name
        );

    if (~indexOfFoundIngredient) {
        ingredientsList[indexOfFoundIngredient].amount += ingredientToAdd.amount;
        return ingredientsList;
    }

    return [...ingredientsList, new Ingredient(ingredientToAdd.name, ingredientToAdd.amount)];
}

export function handleSeveralIngredientsAddition(currentState: ShoppingListState, ingredientsToAdd: Ingredient[]): Ingredient[] {
    const ingredientsList = currentState.ingredientsList.slice();

    for (let i = 0, len = ingredientsToAdd.length; i < len; i++) {
            const indexOfFoundIngredient: number = ingredientsList.findIndex(
                (ingredient) => ingredient.name === ingredientsToAdd[i].name
            );

        if (~indexOfFoundIngredient) {
            ingredientsList[indexOfFoundIngredient].amount += ingredientsToAdd[i].amount;
        } else {
            ingredientsList.push(new Ingredient(ingredientsToAdd[i].name, ingredientsToAdd[i].amount));
        }
    }

    return ingredientsList;
}