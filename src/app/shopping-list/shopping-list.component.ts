import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientsList: Ingredient[];

  constructor(private shoppingListService: ShoppingListService, private addIngredientSubscription: Subscription) { }

  ngOnInit() {
    this.ingredientsList = this.shoppingListService.ingredientsList;

    this.addIngredientSubscription = this.shoppingListService.addIngredient.subscribe((data: { updatedIngredientsList: Ingredient[] }) => {
      this.ingredientsList = data.updatedIngredientsList;
    });
  }

  ngOnDestroy() {
    this.addIngredientSubscription.unsubscribe();
  }

}
