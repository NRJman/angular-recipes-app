import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToggleDropdownDirective } from './toggle-dropdown.directive';

@NgModule({
    declarations: [
        ToggleDropdownDirective
    ],
    exports: [
        CommonModule,
        ToggleDropdownDirective
    ]
})
export class SharedModule {}
