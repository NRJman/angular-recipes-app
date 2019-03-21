import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes.model';
import { ActivatedRoute, Data } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  public recipe: Recipe;
  public recipeForm: FormGroup;
  private editMode: boolean;
  private currentRecipeId: number;
  private resolverDataSubscription: Subscription;

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

  onDeleteIngredient(id: number): void {
    (<FormArray>this.recipeForm.get('ingredients')).controls.splice(id, 1);
  }

  onSubmitForm(): void {  }

  ngOnInit() {
    this.resolverDataSubscription = this.route.data.subscribe((data: Data) => {
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

    if (this.editMode) {
      this.recipeForm.patchValue({
        'name': this.recipe.recipeName,
        'imageUrl': this.recipe.recipeImgUrl,
        'description': this.recipe.recipeDescription
      });

      this.recipe.recipeIngredients.forEach((ingredient) => {
        (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
          'name': new FormControl(ingredient.name),
          'amount': new FormControl(ingredient.amount)
        }));
      });
    }
  }

  ngOnDestroy() {
    this.resolverDataSubscription.unsubscribe();
  }

}
