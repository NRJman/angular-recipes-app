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
  private currentRecipeId: number;

  constructor(private route: ActivatedRoute) { }

  onAddIngredient() {
    const ingredientNameControl = new FormControl(null),
      ingredientAmountControl = new FormControl(1);

    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null),
        'amount': new FormControl(1)
      })
    );
  }

  onDeleteIngredient(id: number) {
    (<FormArray>this.recipeForm.get('ingredients')).controls.splice(id, 1);
  }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      if (data.recipe.value) {
        this.recipe = data.recipe.value;
        this.currentRecipeId = data.recipe.id;
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
