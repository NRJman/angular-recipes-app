import { Recipe } from './../recipes.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RecipesService } from '../recipes.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe> {
    constructor(private recipesService: RecipesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
        return this.recipesService.recipesList[route.params['id']];
    }
}
