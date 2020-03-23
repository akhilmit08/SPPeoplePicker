import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[keyEnterListner]' })

export class EnterCatcher {
    @HostListener('keydown', ['$event']) onKeyDown(e) {
        console.log(e.keyCode)
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    }
}