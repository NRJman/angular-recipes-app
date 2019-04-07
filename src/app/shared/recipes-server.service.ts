import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipesService } from '../recipes/recipes.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Recipe } from '../recipes/recipes.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RecipesServerService {
    constructor(private http: HttpClient, private recipesService: RecipesService, private authService: AuthService) { }

    getRecipes() {
        return this.http.get<Recipe[]>('https://angular-recipes-app-database.firebaseio.com/recipes.json', {
                observe: 'body',        // here is just to show how to
                responseType: 'json'   // use request configuration object
            })
            .pipe(map((recipes) => {
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
        return this.http.put(
                'https://angular-recipes-app-database.firebaseio.com/recipes.json',
                this.recipesService.recipesList,
                { observe: 'events' }
            )
            .pipe(catchError(error => {
                console.log('Error is handled in a service!');
                return throwError('Here is an error: SOMETHING WENT WRONG!');
            }));
    }
}
