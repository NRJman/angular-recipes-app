import { Recipe } from './recipes.model';
import { EventEmitter } from '@angular/core';

export class RecipesService {
    private _recipesList: Recipe[] = [
        new Recipe('First Recipe', 'First Description', 'https://torange.biz/photo/38/IMAGE/pizza-health-recipe-38014.jpg'),
        new Recipe('Second Recipe', 'Second Description', 'https://torange.biz/photo/38/IMAGE/pizza-health-recipe-38014.jpg')
    ];

    private _selectedRecipe: Recipe;
    selectRecipe = new EventEmitter<{ recipe: Recipe }>();

    onRecipeSelected(recipe: Recipe): void {
        this.selectedRecipe = recipe;
    }

    get selectedRecipe(): Recipe {
        return this._selectedRecipe;
    }

    get recipesList(): Recipe[] {
        return this._recipesList.slice();
    }

    set selectedRecipe(recipe: Recipe) {
        this._selectedRecipe = recipe;
    }
}
