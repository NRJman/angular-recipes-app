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

  constructor(private reсipesService: RecipesService) { }

  onRecipeSelect(): void {
    this.reсipesService.onRecipeSelected(this.recipeData);
    this.reсipesService.selectRecipe.emit({ recipe: this.recipeData });
  }

  ngOnInit() {
  }

}
