import { NgModule } from "@angular/core";
import { RecipesRoutingModule } from "./recipes-routing.module";

import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipesComponent,
        RecipeEditComponent,
        RecipeStartComponent
    ],
    imports: [
        CommonModule,
        RecipesRoutingModule
    ]
})
export class RecipesModule { }