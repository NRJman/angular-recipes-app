import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoutes: Routes = [
    { path: 'recipe-book', component: RecipesComponent, children: [
        { path: ':id/details', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent },
        { path: 'recipe-start', component: RecipeStartComponent }
    ] },
    { path: '', redirectTo: 'recipe-book', pathMatch: 'full' },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'page-not-found' }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}