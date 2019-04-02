import { Component } from '@angular/core';
import { RecipesServerService } from '../shared/recipes-server.service';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipes.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(private recipesServerService: RecipesServerService, private recipesService: RecipesService) { }

    onSaveData() {
        this.recipesServerService.saveRecipes().subscribe((data: Recipe[]) => {
            console.log(data);
        });
    }

    onFetchData() {
        const recipesServiceCopy = this.recipesService;

        this.recipesServerService.getRecipes().subscribe((data) => {
            recipesServiceCopy.recipesList = data;
            recipesServiceCopy.updateRecipesList.next(recipesServiceCopy.recipesList);
        });
    }
}
