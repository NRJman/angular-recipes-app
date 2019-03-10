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

    onIngredientAdded(ingredientToAdd: Ingredient): void {
        let indexOfFoundIngredient: number = this.ingredientsList
            .findIndex((listIngredient) => listIngredient.name === ingredientToAdd.name);

        if (~indexOfFoundIngredient) {
            this._ingredientsList[indexOfFoundIngredient].amount += ingredientToAdd.amount;
        } else {
            this._ingredientsList.push(new Ingredient(ingredientToAdd.name, ingredientToAdd.amount));
        }
    }

    onSomeIngredientsAdded(ingredientsToAdd: Ingredient[]): void {

        for (let i = 0, len = ingredientsToAdd.length; i < len; i++) {
            let indexOfFoundIngredient: number = this.ingredientsList
                .findIndex((ingredient) => ingredient.name === ingredientsToAdd[i].name);

            if (~indexOfFoundIngredient) {
                this._ingredientsList[indexOfFoundIngredient].amount += ingredientsToAdd[i].amount;
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
