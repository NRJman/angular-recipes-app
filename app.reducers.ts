import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducers';

export interface AppState {
    shoppingList: fromShoppingList.State;
}
