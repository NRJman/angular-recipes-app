import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from './../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private selectedRecipeId: number;
  selectedRecipe: Recipe;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  onRecipeAddToShoppingList(): void {
    this.recipesService.onRecipeAddedToShoppingList(this.selectedRecipeId);
  }

  onEditRecipe(): void {
    this.router.navigate(['./edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    const recipesServiceCopy = this.recipesService;
    recipesServiceCopy.deleteCertainRecipe(this.selectedRecipeId);
    recipesServiceCopy.updateRecipesList.next(this.recipesService.recipesList);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedRecipeId = params['id'];
      this.selectedRecipe = this.recipesService.recipesList[params['id']];
    });
  }

}
