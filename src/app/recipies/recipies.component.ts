import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipies.model';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css']
})
export class RecipiesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor() { }

  onRecipeSelected(event: Recipe) {
    this.selectedRecipe = event;
  }

  ngOnInit() {
  }

}
