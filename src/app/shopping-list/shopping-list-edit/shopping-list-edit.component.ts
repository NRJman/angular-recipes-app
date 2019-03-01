import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from './../../shared/ingredient.model'

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() ingredientAdd = new EventEmitter<{ ingredient: Ingredient }>();

  constructor() { }

  onFormSubmit(nameInput): void {
    const ingredientName = nameInput.value,
          ingredientAmount = this.amountInput.nativeElement.value;

    this.ingredientAdd.emit({ ingredient: new Ingredient(ingredientName, ingredientAmount) });
  }

  ngOnInit() {
  }

}
