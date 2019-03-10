import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    constructor(
        public recipeName: string,
        public recipeDescription: string,
        public recipeImgUrl: string,
        public recipeIngredients: Ingredient[]
    ) { }
}
