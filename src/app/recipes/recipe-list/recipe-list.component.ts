import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Recipe } from './../recipes.model';
import { Store } from '@ngrx/store';
import * as fromRecipes from './../store/recipes.reducers';
import { Observable } from 'rxjs';
import { getRecipesState } from '../store/recipes.selectors';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipesState: Observable<fromRecipes.State>;
  public recipesList: Recipe[];

  constructor(private store: Store<fromRecipes.FeatureState>) {}

  ngOnInit() {
    this.recipesState = <Observable<fromRecipes.State>>this.store.select(getRecipesState);
  }
}
