import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
    selector: '[appToggleDropdown]'
})
export class ToggleDropdownDirective {
    @Input() dropdownList;

    constructor(private _elemRef: ElementRef, private renderer: Renderer2) {
        console.log(_elemRef);
    }

    @HostListener('document:click', ['$event'])
    onclick(event): void {
        const target = event.target,
            directiveElemRef = this.elemRef.nativeElement,
            dropdownListElemRef = this.dropdownList,
            renderer: Renderer2 = this.renderer;

        if (!(dropdownListElemRef.contains(target) || dropdownListElemRef === target)) {
            if (target ===  directiveElemRef) {
                if (dropdownListElemRef.classList.contains('show')) {
                    renderer.removeClass(dropdownListElemRef, 'show');
                } else {
                    renderer.addClass(dropdownListElemRef, 'show');
                }
            } else {
                renderer.removeClass(dropdownListElemRef, 'show');
            }
        }
    }

    get elemRef(): ElementRef {
        return this._elemRef;
    }

    set elemRef(value) {
        this._elemRef = value;
    }
}
