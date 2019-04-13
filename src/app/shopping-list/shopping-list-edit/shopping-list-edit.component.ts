import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './../store/shopping-list.reducers';
import { AddIngredient, DeleteIngredient, UpdateIngredient } from '../store/shopping-list.actions';
import { AppState } from 'app.reducers';

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
  public shoppingListState: Observable<fromShoppingList.State> = this.store.select('shoppingList');

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) { }

  onFormSubmit(nameInput: HTMLInputElement): void {
    const ingredientName = nameInput.value,
          ingredientAmount = +this.amountInput.nativeElement.value,
          newIngredient = new Ingredient(ingredientName, ingredientAmount);

    this.store.dispatch(new AddIngredient(newIngredient));
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
  }

  ngOnInit() {
    this._selectItemSubscription = this.store.select('shoppingList').subscribe(
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
  }

}
