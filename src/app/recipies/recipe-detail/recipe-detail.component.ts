import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipies.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input('theSelectedRecipe') selectedRecipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

}
