import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from './../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { AddSeveralIngredients } from './../../shopping-list/store/shopping-list.actions';
import { AppState } from 'app.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private selectedRecipeId: number;
  selectedRecipe: Recipe;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  onRecipeAddToShoppingList(): void {
    this.store.dispatch(new AddSeveralIngredients(this.recipesService.recipesList[this.selectedRecipeId].recipeIngredients));
  }

  onEditRecipe(): void {
    this.router.navigate(['./edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    const recipesServiceCopy = this.recipesService;
    recipesServiceCopy.deleteCertainRecipe(this.selectedRecipeId);
    recipesServiceCopy.updateRecipesList.next(this.recipesService.recipesList);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedRecipeId = params['id'];
      this.selectedRecipe = this.recipesService.recipesList[params['id']];
    });
  }

}
