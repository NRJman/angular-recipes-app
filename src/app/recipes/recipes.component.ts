import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from './recipes.service';

import { Recipe } from './recipes.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  recipesList: Recipe[];

  constructor(private recipesService: RecipesService, private router: Router, private route: ActivatedRoute) { }

  onNewRecipe() {
    this.router.navigate(['/recipe-book/new-recipe']);
  }

  ngOnInit() {
    this.recipesList = this.recipesService.recipesList;
  }

}
