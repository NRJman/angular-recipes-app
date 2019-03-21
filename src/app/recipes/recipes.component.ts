import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from './recipes.service';

import { Recipe } from './recipes.model';
import { Subscription } from 'rxjs';
import { registerContentQuery } from '@angular/core/src/render3/instructions';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  recipesList: Recipe[];
  private selectRecipeSubscription: Subscription;

  constructor(private recipesService: RecipesService, private router: Router, private route: ActivatedRoute) { }

  onNewRecipe() {
    this.router.navigate(['/recipe-book/new-recipe']);
  }

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
