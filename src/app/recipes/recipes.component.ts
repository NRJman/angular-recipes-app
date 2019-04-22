import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from './recipes.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  selectedRecipe: Recipe;

  constructor(private router: Router) { }

  onNewRecipe() {
    this.router.navigate(['/recipe-book/new-recipe']);
  }

}
