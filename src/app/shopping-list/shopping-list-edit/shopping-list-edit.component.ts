import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from './../../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  private _selectItemSubscription: Subscription;
  public editMode: boolean = false;
  public selectedIngredientId: number;

  constructor(private shoppingListService: ShoppingListService) { }

  onFormSubmit(nameInput: HTMLInputElement): void {
    const ingredientName = nameInput.value,
          ingredientAmount = +this.amountInput.nativeElement.value,
          newIngredient = new Ingredient(ingredientName, ingredientAmount);

    this.shoppingListService.onIngredientAdded(newIngredient);
    this.shoppingListService.updateIngredientsList.next({ updatedIngredientsList: this.shoppingListService.ingredientsList });

    console.log(this.shoppingListForm);
  }

  onIngredientUpdate() {
    this.shoppingListService.setCertainIngredient(
      this.selectedIngredientId,
      {
        name: this.shoppingListForm.value.recipeItemName,
        amount: this.shoppingListForm.value.recipeItemAmount
      }
    );
    this.shoppingListService.updateIngredientsList.next({ updatedIngredientsList: this.shoppingListService.ingredientsList });
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  ngOnInit() {
    this._selectItemSubscription = this.shoppingListService.selectIngredient.subscribe((event: { itemIndex: number }) => {
      this.shoppingListForm.setValue({
        'recipeItemName': this.shoppingListService.getCertainIngredient(event.itemIndex).name,
        'recipeItemAmount': this.shoppingListService.getCertainIngredient(event.itemIndex).amount
      });

      this.selectedIngredientId = event.itemIndex;
      this.editMode = true;
    });
  }

  ngOnDestroy() {
    this._selectItemSubscription.unsubscribe();
  }

}
