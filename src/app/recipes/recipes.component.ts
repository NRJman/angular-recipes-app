import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';

import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  recipesList: Recipe[];

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.selectedRecipe = this.recipesService.selectedRecipe;
    this.recipesList = this.recipesService.recipesList;

    this.recipesService.selectRecipe.subscribe((event: {recipe: Recipe}) => {
      this.selectedRecipe = event.recipe;
    });
  }

}
