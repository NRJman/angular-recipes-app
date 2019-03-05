import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Recipe } from './../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Input('theRecipesList') recipesList: Recipe[];
  
  constructor() {}

  ngOnInit() {}
}
