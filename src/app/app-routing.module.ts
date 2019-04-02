import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeResolver } from './recipes/recipe-edit/recipe-resolver.service';
import { CanDeactivateGuard } from './recipes/recipe-edit/can-deactivate.service';
import { AuthComponent } from './auth/auth.component';
import { AuthTypeResolver } from './auth/auth-type-resolver.service';
import { AuthGuard } from './auth/auth-guard.service';


const appRoutes: Routes = [
    { path: 'recipe-book', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new-recipe', component: RecipeEditComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
        { path: ':id', component: RecipeDetailComponent },
        {
            path: ':id/edit',
            component: RecipeEditComponent,
            canActivate: [AuthGuard],
            canDeactivate: [CanDeactivateGuard],
            resolve: { recipe: RecipeResolver }
        }
    ] },
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
