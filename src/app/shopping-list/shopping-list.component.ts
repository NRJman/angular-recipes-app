import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducers';
import { SelectIngredient } from './store/shopping-list.actions';
import * as fromApp from 'src/app/store/app.reducers';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<fromShoppingList.State>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.State>
  ) { }

  onSelectIngredient(selectedItemIndex: number): void {
    this.store.dispatch(new SelectIngredient(selectedItemIndex));
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }
}
