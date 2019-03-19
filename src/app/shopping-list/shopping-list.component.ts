import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private addIngredientSubscription: Subscription;
  ingredientsList: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

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
