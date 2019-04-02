import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipesService } from '../recipes/recipes.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Recipe } from '../recipes/recipes.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RecipesServerService {
    constructor(private http: Http, private recipesService: RecipesService, private authService: AuthService) { }

    getRecipes() {
        const token = this.authService.getToken();

        return this.http.get('https://angular-recipes-app-database.firebaseio.com/recipes.json?auth=' + token)
            .pipe(map((response: Response) => {
                const recipes: Recipe[] = response.json();

                for (const recipe of recipes) {
                    if (!recipe.recipeIngredients) {
                        recipe.recipeIngredients = [];
                    }
                }

                return recipes;
            }))
            .pipe(catchError(error => {
                console.log('Error is handled in a service!');
                return throwError('Here is an error: SOMETHING WENT WRONG!');
            }));
    }

    saveRecipes() {
        const token = this.authService.getToken();

        return this.http.put('https://angular-recipes-app-database.firebaseio.com/recipes.json', this.recipesService.recipesList)
            .pipe(map((response: Response) => {
                return response.json();
            }))
            .pipe(catchError(error => {
                console.log('Error is handled in a service!');
                return throwError('Here is an error: SOMETHING WENT WRONG!');
            }));
    }
}
