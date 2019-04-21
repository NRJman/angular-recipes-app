import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes.model';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { RecipesService } from '../recipes.service';
import { CanDeactivateGuard } from './can-deactivate.service';
import { Store } from '@ngrx/store';
import * as fromRecipes from './../store/recipes.reducers';
import * as RecipesActions from './../store/recipes.actions';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private store: Store<fromRecipes.FeatureState>
  ) { }

  onAddIngredient() {
    const ingredientNameControl = new FormControl(null, Validators.required),
      ingredientAmountControl = new FormControl(1, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$')
      ]);

    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': ingredientNameControl,
        'amount': ingredientAmountControl
      })
    );
  }

  onDeleteFormIngredient(id: number): void {
    (<FormArray>this.recipeForm.get('ingredients')).controls.splice(id, 1);
  }

  onSubmitForm(): void {
    (this.editMode) ? this.modifyExistingRecipe() : this.addNewRecipe();
  }

  onCancelForm(): void {
    (this.editMode) ? this.router.navigate(['/recipe-book', this.currentRecipeId]) : this.router.navigate(['/recipe-book']);
  }

  addNewRecipe(): void {
    const recipesServiceCopy = this.recipesService,
          recipeFormCopy = this.recipeForm,
          newRecipe = new Recipe(
            recipeFormCopy.value['name'],
            recipeFormCopy.value['description'],
            recipeFormCopy.value['imageUrl'],
            recipeFormCopy.value['ingredients']
          );

    this.store.dispatch(new RecipesActions.AddRecipe(newRecipe));
    // this.router.navigate(['/recipe-book']);
  }

  modifyExistingRecipe(): void {
    const recipesServiceCopy = this.recipesService,
          recipeFormCopy = this.recipeForm,
          updatedRecipe = new Recipe(
            recipeFormCopy.value['name'],
            recipeFormCopy.value['description'],
            recipeFormCopy.value['imageUrl'],
            recipeFormCopy.value['ingredients']
          );

    this.store.dispatch(new RecipesActions.ModifyRecipe({ id: this.currentRecipeId, newRecipeValue: updatedRecipe }));
    // this.router.navigate(['/recipe-book', this.currentRecipeId]);
  }

  canDeactivate(): Promise<boolean> | Observable<boolean> | boolean {
    return (this.recipeForm.dirty) ? confirm(`Are you sure you want to quit?
All unsaved data will be lost.`) : true;
  }

  ngOnInit() {
    this.resolverDataSubscription = this.route.data.subscribe((data: Data) => {
      if (data.hasOwnProperty('recipe')) {
        this.recipe = data.recipe.value;
        this.currentRecipeId = data.recipe.id;
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    });

    this.recipeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'imageUrl': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
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
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [
            Validators.required,
            Validators.pattern('^[1-9]+[0-9]*$')
          ])
        }));
      });
    }
  }

  ngOnDestroy() {
    this.resolverDataSubscription.unsubscribe();
  }

}
