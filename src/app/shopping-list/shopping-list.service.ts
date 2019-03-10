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
            let indexOfFoundIngredient: number = this.ingredientsList
                .findIndex((ingredient) => ingredient.name === ingredientsToAdd[i].name);

            if (~indexOfFoundIngredient) {
                this.ingredientsList[indexOfFoundIngredient].amount += ingredientsToAdd[i].amount;
            } else {
                this._ingredientsList.push(new Ingredient(ingredientsToAdd[i].name, ingredientsToAdd[i].amount));
            }
        }

        // Wrong behaviour, never emit events in a service!
        this.addIngredient.emit({ updatedIngredientsList: this.ingredientsList });
    }

    get ingredientsList(): Ingredient[] {
        return this._ingredientsList.slice();
    }
}
