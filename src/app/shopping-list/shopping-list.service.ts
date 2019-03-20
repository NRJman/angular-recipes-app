import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    private _ingredientsList: Ingredient[] = [
        new Ingredient('Tomatoes', 5),
        new Ingredient('Eggs', 3)
    ];

    updateIngredientsList = new Subject<{ [updatedList: string]: Ingredient[] }>();
    selectIngredient = new Subject<{ itemIndex: number }>();

    onIngredientAdded(ingredientToAdd: Ingredient): void {
        const indexOfFoundIngredient: number = this.ingredientsList
            .findIndex((listIngredient) => listIngredient.name === ingredientToAdd.name);

        if (~indexOfFoundIngredient) {
            this._ingredientsList[indexOfFoundIngredient].amount += ingredientToAdd.amount;
        } else {
            this._ingredientsList.push(new Ingredient(ingredientToAdd.name, ingredientToAdd.amount));
        }
    }

    onSomeIngredientsAdded(ingredientsToAdd: Ingredient[]): void {
        for (let i = 0, len = ingredientsToAdd.length; i < len; i++) {
            const indexOfFoundIngredient: number = this.ingredientsList
                .findIndex((ingredient) => ingredient.name === ingredientsToAdd[i].name);

            if (~indexOfFoundIngredient) {
                this._ingredientsList[indexOfFoundIngredient].amount += ingredientsToAdd[i].amount;
            } else {
                this._ingredientsList.push(new Ingredient(ingredientsToAdd[i].name, ingredientsToAdd[i].amount));
            }
        }

        this.updateIngredientsList.next({ updatedIngredientsList: this.ingredientsList });
    }

    get ingredientsList(): Ingredient[] {
        return this._ingredientsList.slice();
    }

    getCertainIngredient(index: number): Ingredient {
        return this.ingredientsList[index];
    }

    setCertainIngredient(id: number, updatedIngredientValue: { name: string, amount: number }): void {
        [this._ingredientsList[id].name, this._ingredientsList[id].amount] = [updatedIngredientValue.name, updatedIngredientValue.amount];
    }
}
