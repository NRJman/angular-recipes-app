import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { RecipesService } from "./recipes.service";
import { map, catchError } from 'rxjs/operators';
import { throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecipesServerService {
    constructor(private http: Http, private recipesService: RecipesService) { }

    getRecipes() {
        return this.http.get('https://angular-recipes-app-database.firebaseio.com/recipes.json')
            .pipe(map((response: Response) => {
                return response.json();
            }))
            .pipe(catchError(error => {
                console.log('Error is handled in a service!');
                return throwError('Here is an error: SOMETHING WENT WRONG!');
            }));
    }

    saveRecipes() {
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