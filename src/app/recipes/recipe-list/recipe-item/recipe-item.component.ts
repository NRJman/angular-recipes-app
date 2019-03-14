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
  @Input() recipeId: number;

  constructor(private reсipesService: RecipesService) { }

  ngOnInit() {
  }

}
