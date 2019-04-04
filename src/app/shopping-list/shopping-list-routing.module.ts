import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule, Routes } from '@angular/router';

const shoppingListRoutes: Routes = [
    { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(shoppingListRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class  ShoppingListRoutingModule { }
