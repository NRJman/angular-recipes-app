import { Recipe } from './../recipes.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RecipesService } from '../recipes.service';

interface ResolverData {
    value: Recipe;
    id: number;
}

@Injectable({
    providedIn: 'root'
})
export class RecipeResolver implements Resolve<ResolverData> {
    constructor(private recipesService: RecipesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolverData> | Promise<ResolverData> | ResolverData {
        return {
            value: this.recipesService.recipesList[+route.params['id']],
            id: +route.params['id']
        };
    }
}
