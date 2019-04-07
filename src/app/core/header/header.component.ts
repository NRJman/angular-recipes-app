import { Component } from '@angular/core';
import { RecipesServerService } from '../../shared/recipes-server.service';
import { RecipesService } from '../../recipes/recipes.service';
import { Recipe } from '../../recipes/recipes.model';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(
        private recipesServerService: RecipesServerService,
        private recipesService: RecipesService,
        private authService: AuthService,
        private router: Router
    ) { }

    onSaveData() {
        this.recipesServerService.saveRecipes().subscribe(
            (response: HttpEvent<Object>) => {
                console.log(response.type === HttpEventType.Sent);
            }
        );
    }

    onFetchData() {
        const recipesServiceCopy = this.recipesService;

        this.recipesServerService.getRecipes().subscribe((data) => {
            recipesServiceCopy.recipesList = data;
            recipesServiceCopy.updateRecipesList.next(recipesServiceCopy.recipesList);
        });
    }

    onLogout() {
        this.authService.logoutUser();

        if (!this.authService.isUserAuthenticated()) {
            this.router.navigate(['/recipe-book']);
        }
    }
}
