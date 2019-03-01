import { Component, OnInit } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public ingredientsList: Ingredient[] = [
    new Ingredient('Tomatoes', 5),
    new Ingredient('Eggs', 3)
  ];

  constructor() { }

  onIngredientAdded(event): void {
    this.ingredientsList.push(event.ingredient);
  }

  ngOnInit() {
  }

}
