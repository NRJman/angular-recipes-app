import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { ActivatedRoute, Data } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  public recipe: Recipe;
  public recipeForm: FormGroup;
  private editMode: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      if (data.recipe) {
        this.recipe = data.recipe;
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    });

    this.recipeForm = new FormGroup({
      'name': new FormControl(),
      'imageUrl': new FormControl(),
      'description': new FormControl(),
      'ingredients': new FormArray([])
    });
  }

}
