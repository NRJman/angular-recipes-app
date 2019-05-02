import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './../store/shopping-list.reducers';
import { AddIngredients, DeleteIngredient, UpdateIngredient, DisableEditMode } from '../store/shopping-list.actions';
import * as fromApp from 'src/app/store/app.reducers';
import { getShoppingListState } from '../store/shopping-list.selectors';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  private _selectItemSubscription: Subscription;
  public selectedIngredientId: number;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.State>
  ) { }

  onFormSubmit(nameInput: HTMLInputElement): void {
    const ingredientName = nameInput.value,
          ingredientAmount = +this.amountInput.nativeElement.value,
          newIngredient = new Ingredient(ingredientName, ingredientAmount);

    this.store.dispatch(new AddIngredients([newIngredient]));
  }

  onUpdateIngredient(): void {
    this.store.dispatch(new UpdateIngredient({
      id: this.selectedIngredientId,
      name: this.shoppingListForm.value.ingredientName,
      amount: this.shoppingListForm.value.ingredientAmount
    }));

    this.onClearForm();
  }

  onDeleteIngredient(): void {
    this.store.dispatch(new DeleteIngredient(this.selectedIngredientId));

    this.onClearForm();
  }

  onClearForm(): void {
    this.shoppingListForm.reset();
    console.log(this.shoppingListForm);
  }

  onUnselectIngredient(): void {
    this.onClearForm();
    this.store.dispatch(new DisableEditMode());
  }

  ngOnInit() {
    this._selectItemSubscription = this.store.select(getShoppingListState).subscribe(
      (state: fromShoppingList.State) => {
        if (state.isEditMode) {
          this.shoppingListForm.setValue({
            'ingredientName': state.selectedIngredient.name,
            'ingredientAmount': state.selectedIngredient.amount
          });
        }
      }
    );
  }

  ngOnDestroy() {
    this._selectItemSubscription.unsubscribe();

    this.store.dispatch(new DisableEditMode());
  }
}
