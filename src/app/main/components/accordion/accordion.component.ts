import { Component, ViewChild, OnInit, Renderer, Input } from '@angular/core';

@Component({
    selector: 'accordion',
    templateUrl: 'accordion.component.html',
    styleUrls: ['accordion.component.scss'],
})

export class AccordionComponent implements OnInit {
    accordionExapanded = false;
    @ViewChild('content') cardContent: any;
    @Input()
    title: String;
    @Input()
    expand: boolean;

    constructor(public renderer: Renderer) {
    }

    ngOnInit() {
        this.renderer.setElementStyle(this.cardContent.el, 'webkitTransition', 'max-height 300ms  ease 300ms');
        if (this.expand === true) {
            this.accordionExapanded = true;
        } else {
            this.accordionExapanded = false;
        }

        if (this.accordionExapanded) {
            this.renderer.setElementStyle(this.cardContent.el, 'max-height', '500px');
        }
    }

    toggleAccordion() {
        if (this.accordionExapanded) {
            this.renderer.setElementStyle(this.cardContent.el, 'max-height', '0px');
        } else {
            this.renderer.setElementStyle(this.cardContent.el, 'max-height', '500px');
        }

        this.accordionExapanded = !this.accordionExapanded;
    }

}
