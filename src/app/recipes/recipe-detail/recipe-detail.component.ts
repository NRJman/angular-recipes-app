import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from './../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  exampleOfRecipesList: Recipe[];

  constructor(private recipesService: RecipesService) { }

  onRecipeAddToShoppingList(): void {
    this.recipesService.onRecipeAddedToShoppingList(this.selectedRecipe.recipeIngredients);
  }

  ngOnInit() {
    this.selectedRecipe = this.recipesService.selectedRecipe;
    this.exampleOfRecipesList = this.recipesService.recipesList;

    this.recipesService.selectRecipe.subscribe((event: {recipe: Recipe}) => {
      this.selectedRecipe = event.recipe;
    });
  }

}
