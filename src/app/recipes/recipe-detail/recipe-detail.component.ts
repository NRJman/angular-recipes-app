import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from './../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private router: Router) { }

  onRecipeAddToShoppingList(): void {
    this.recipesService.onRecipeAddedToShoppingList(this.selectedRecipe.recipeIngredients);
  }
  onEditRecipe(): void {
    this.router.navigate(['./edit'], { relativeTo: this.route });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedRecipe = this.recipesService.recipesList[params['id']];
    });
  }

}
