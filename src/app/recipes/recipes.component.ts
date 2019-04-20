import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from './recipes.service';

import { Recipe } from './recipes.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
