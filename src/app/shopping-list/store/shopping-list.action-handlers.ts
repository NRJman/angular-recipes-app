import { Ingredient } from 'src/app/shared/ingredient.model';

export function handleIngredientAdding(ingredientsList: Ingredient[], ingredientsToAdd: Ingredient[]): Ingredient[] {
    if (ingredientsToAdd.length === 1) {
        const ingredientToAdd = ingredientsToAdd[0],
            indexOfFoundIngredient: number = ingredientsList.findIndex(
                (ingredient) => ingredient.name === ingredientToAdd.name
            );

        if (~indexOfFoundIngredient) {
            ingredientsList[indexOfFoundIngredient].amount += ingredientToAdd.amount;
            return ingredientsList;
        }

        return [...ingredientsList, new Ingredient(ingredientToAdd.name, ingredientToAdd.amount)];
    } else if (ingredientsToAdd.length > 1) {
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

    throw(new Error('The length of ingredientsToAdd array is less than 1.'));
}

export function handleIngredientDeleting(ingredientsList: Ingredient[], id: number): Ingredient[] {
    return ingredientsList = ingredientsList.splice(id, 1);
}

export function handleIngredientUpdate(
    ingredientsList: Ingredient[],
    updatedIngredientInfo: { id: number, name: string, amount: number }
): Ingredient[] {
    const ingredientId: number = updatedIngredientInfo.id;

    ingredientsList[ingredientId].name = updatedIngredientInfo.name;
    ingredientsList[ingredientId].amount = updatedIngredientInfo.amount;

    return ingredientsList;
}

export function handleIngredientSelecting(ingredientsList:  Ingredient[], id: number) {
    return ingredientsList[id];
}
