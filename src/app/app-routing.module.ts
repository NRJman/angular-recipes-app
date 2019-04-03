import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthComponent } from './auth/auth.component';

import { AuthTypeResolver } from './auth/auth-type-resolver.service';


const appRoutes: Routes = [
    { path: '', redirectTo: 'recipe-book', pathMatch: 'full' },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: 'sign/:accessType', component: AuthComponent, resolve: { accessType: AuthTypeResolver } },
    { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
