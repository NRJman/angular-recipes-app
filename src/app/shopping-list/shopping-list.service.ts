import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
