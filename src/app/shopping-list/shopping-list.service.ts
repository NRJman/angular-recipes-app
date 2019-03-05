import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    private _ingredientsList: Ingredient[] = [
        new Ingredient('Tomatoes', 5),
        new Ingredient('Eggs', 3)
    ];

    addIngredient = new EventEmitter<{ updatedIngredientsList: Ingredient[] }>();

    onIngredientAdded(ingredient: Ingredient): void {
        this._ingredientsList.push(ingredient);
    }

    get ingredientsList(): Ingredient[] {
        return this._ingredientsList.slice();
    }
}
