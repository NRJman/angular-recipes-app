import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";

export const ingredientDisappearAnimation = trigger('ingredientState', [
    state('in', style({
        transform: 'translateX(0)',
        opacity: '1'
    })),
    state('void', style({
        transform: 'translateX(1500px)',
        opacity: '0'
    })),
    transition('* => void', animate('400ms ease-out')),
    transition('void => *', animate('400ms ease-out'))
]);
