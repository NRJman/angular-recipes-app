import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    @Output() routeToComponent: EventEmitter<{ componentName: string }> = new EventEmitter<{ componentName: string }>();
    
    onComponentRoute(componentToRoute): void {
        this.routeToComponent.emit({ componentName: componentToRoute });
    }
}
