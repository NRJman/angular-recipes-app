import { Component, OnInit } from '@angular/core';
import { Recipe } from './../recipies.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipiesList: Recipe[] = [
    new Recipe('First Recipe', 'First Description', 'https://torange.biz/photo/38/IMAGE/pizza-health-recipe-38014.jpg'),
    new Recipe('Second Recipe', 'Second Description', 'https://torange.biz/photo/38/IMAGE/pizza-health-recipe-38014.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
