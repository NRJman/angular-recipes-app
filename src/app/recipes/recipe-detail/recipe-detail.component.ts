import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from './../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddSeveralIngredients } from './../../shopping-list/store/shopping-list.actions';
import * as fromApp from 'src/app/store/app.reducers';
import * as fromRecipes from './../store/recipes.reducers';
import * as RecipesActions from './../store/recipes.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipesState: Observable<fromRecipes.State>;
  private selectedRecipeId: number;
  selectedRecipe: Recipe;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipes.FeatureState>
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
    this.recipesState = this.store.select('recipes');

    this.route.params.subscribe((params: Params) => {
      this.selectedRecipeId = params['id'];

      this.store.dispatch(new RecipesActions.SelectRecipe(this.selectedRecipeId));
    });
  }

}
