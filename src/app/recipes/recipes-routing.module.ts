import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolver } from './recipe-edit/recipe-resolver.service';

import { AuthGuard } from '../auth/auth-guard.service';
import { CanDeactivateGuard } from './recipe-edit/can-deactivate.service';

const recipesRoutes: Routes = [
    {
        path: 'recipe-book', component: RecipesComponent, children: [
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
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }
