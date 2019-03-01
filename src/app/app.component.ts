import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentComponentName: string = 'recipes';

  onComponentRouted(event: {componentName: string}): void {
    this.currentComponentName = event.componentName;
  }
}
