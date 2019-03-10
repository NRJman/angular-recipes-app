import { Recipe } from './recipes.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';

@Injectable()
export class RecipesService {
    private _recipesList: Recipe[] = [
        new Recipe('Tomatoes Soup',
            'A delicious soup with tomatoes and pepperoni',
            'https://www.maxpixel.net/static/photo/1x/Yellow-Come-Soup-Paprika-Bread-Creamy-Vegan-3262211.jpg',
            [
                new Ingredient('Tomatoes', 2),
                new Ingredient('Pepperoni', 3)
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
    ];

    private _selectedRecipe: Recipe;
    selectRecipe = new EventEmitter<{ recipe: Recipe }>();

    constructor(private shoppingListService: ShoppingListService) {}

    onRecipeSelected(recipe: Recipe): void {
        this.selectedRecipe = recipe;
    }

    onRecipeAddedToShoppingList(newIngredientsToAdd: Ingredient[]): void {
        this.shoppingListService.onSomeIngredientsAdded(newIngredientsToAdd);
    }

    get selectedRecipe(): Recipe {
        return Object.assign({}, this._selectedRecipe);
    }

    get recipesList(): Recipe[] {
        return this._recipesList.slice();
    }

    set selectedRecipe(recipe: Recipe) {
        this._selectedRecipe = recipe;
    }
}
