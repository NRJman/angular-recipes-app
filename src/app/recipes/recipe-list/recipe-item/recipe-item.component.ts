import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipes.model';
import { RecipesService } from './../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeData: Recipe;

  constructor(private resipesService: RecipesService) { }

  onRecipeSelect(): void {
    this.resipesService.onRecipeSelected(this.recipeData);
    this.resipesService.selectRecipe.emit({ recipe: this.recipeData });
  }

  ngOnInit() {
  }

}
