import { trigger, state, style, transition, animate } from '@angular/animations';

export const navbarCollapseAnimation = trigger('navbarState', [
    state('collapsed', style({
        height: '0px'
    })),
    state('expanded', style({
        height: '*'
    })),
    transition('collapsed <=> expanded', animate('300ms ease-out'))
]);
