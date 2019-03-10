import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    private _ingredientsList: Ingredient[] = [
        new Ingredient('Tomatoes', 5),
        new Ingredient('Eggs', 3)
    ];

    addIngredient = new EventEmitter<{ updatedIngredientsList: Ingredient[] }>();

    onIngredientAdded(ingredient: Ingredient): void {
        this._ingredientsList.push(ingredient);
    }

    onSomeIngredientsAdded(ingredientsToAdd: Ingredient[]): void {
        // this._ingredientsList.push(...ingredientsToAdd);
        for (let i = 0, len = ingredientsToAdd.length; i < len; i++) {
            let isIngredientFoundInList = false;

            for (let j = 0, ingredientsList = this._ingredientsList, len = ingredientsList.length; j < len; j++) {
                if (ingredientsList[j].name === ingredientsToAdd[i].name) {
                    ingredientsList[j].amount += ingredientsToAdd[i].amount;
                    isIngredientFoundInList = true;
                    break;
                }
            }

            if (!isIngredientFoundInList) {
                this._ingredientsList.push(ingredientsToAdd[i]);
            }
        }

        // Wrong behaviour, never emit events in a service!
        this.addIngredient.emit({ updatedIngredientsList: this.ingredientsList });
    }

    get ingredientsList(): Ingredient[] {
        return this._ingredientsList.slice();
    }
}
