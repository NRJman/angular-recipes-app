import { Component, OnInit } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ ingredientsList: Ingredient[] }>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredientsList: Ingredient[] } }>
  ) { }

  onSelectSubject(selectedItemIndex: number): void {
    this.shoppingListService.selectIngredient.next({ itemIndex: selectedItemIndex });
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }
}
