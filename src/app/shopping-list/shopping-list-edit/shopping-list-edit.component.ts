import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from './../../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  onFormSubmit(nameInput: HTMLInputElement): void {
    const ingredientName = nameInput.value,
          ingredientAmount = +this.amountInput.nativeElement.value,
          newIngredient = new Ingredient(ingredientName, ingredientAmount);

    this.shoppingListService.onIngredientAdded(newIngredient);
    this.shoppingListService.addIngredient.emit({ updatedIngredientsList: this.shoppingListService.ingredientsList });
  }

  ngOnInit() {
  }

}
