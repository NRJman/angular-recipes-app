import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from './recipes.service';

import { Recipe } from './recipes.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  recipesList: Recipe[];
  private selectRecipeSubscription: Subscription;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.selectedRecipe = this.recipesService.selectedRecipe;
    this.recipesList = this.recipesService.recipesList;

    this.selectRecipeSubscription = this.recipesService.selectRecipe.subscribe((event: {recipe: Recipe}) => {
      this.selectedRecipe = event.recipe;
    });
  }

  ngOnDestroy() {
    this.selectRecipeSubscription.unsubscribe();
  }

}
