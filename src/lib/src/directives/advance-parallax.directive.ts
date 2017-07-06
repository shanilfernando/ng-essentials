import { Directive, ContentChildren, QueryList, Renderer2, ElementRef, HostListener } from '@angular/core';
import { AdvanceParallaxChildDirective } from './advance-parallax-child.directive';
import { Observable, Subscription } from 'rxjs/Rx';

@Directive({
  selector: '[AdvanceParallax]'
})
export class AdvanceParallaxDirective {
  private nativeElement: Node;
  private mouseMove: Subscription;
  private clientX:any;
  private clientY:any;

  @ContentChildren(AdvanceParallaxChildDirective) contentChildren: QueryList<AdvanceParallaxChildDirective>;


  constructor(private ren: Renderer2, private element: ElementRef) {
    this.nativeElement = element.nativeElement;
    this.ren.setStyle(this.nativeElement, "position", "relative");
    this.ren.setStyle(this.nativeElement, "overflow", "hidden");
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    this.mouseMove = Observable
      .fromEvent<MouseEvent>(document, 'mousemove')
      .sampleTime(50)
      .subscribe(event => {
        if (this.clientX !== undefined || this.clientY !== undefined) {
          let movementX = event.clientX - this.clientX;
          let movementY = event.clientY - this.clientY;
          this.contentChildren.forEach(child => {
            child.easeOutMove(movementX, movementY);
          });
        }
        this.clientX = event.clientX;
        this.clientY = event.clientY;
      });
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    if (this.mouseMove !== undefined && !this.mouseMove.closed) {
      this.mouseMove.unsubscribe();
      this.clientX = undefined;
      this.clientY = undefined;
    }
  }

}
