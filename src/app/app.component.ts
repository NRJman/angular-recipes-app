import { Component } from '@angular/core';
import { RecipesService } from './recipes/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RecipesService]
})
export class AppComponent {
  title = 'app';
  currentComponentName: string = 'recipes';

  constructor(private recipesService: RecipesService) {}

  onComponentRouted(event: {componentName: string}): void {
    this.currentComponentName = event.componentName;
  }
}
