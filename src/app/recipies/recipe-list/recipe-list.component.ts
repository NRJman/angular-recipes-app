import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from './../recipies.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipiesList: Recipe[] = [
    new Recipe('First Recipe', 'First Description', 'https://torange.biz/photo/38/IMAGE/pizza-health-recipe-38014.jpg'),
    new Recipe('Second Recipe', 'Second Description', 'https://torange.biz/photo/38/IMAGE/pizza-health-recipe-38014.jpg')
  ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() { }

  onRecipeSelected(event: Recipe) {
    this.recipeWasSelected.emit(event);
  }

  ngOnInit() {
  }

}
