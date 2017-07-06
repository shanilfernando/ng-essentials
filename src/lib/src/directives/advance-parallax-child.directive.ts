import { Directive, Renderer2, ElementRef, Input, HostBinding } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Directive({
  selector: '[AdvanceParallaxChild]'
})
export class AdvanceParallaxChildDirective {
  private _nativeElement:any;
  @Input() speed: number = 1;
  private _isinitialized: boolean = false;
  private tx = 0;
  private ty = 0;

  @HostBinding('style.-webkit-transform')
  @HostBinding('style.-moz-transform')
  @HostBinding('style.-ms-transform')
  @HostBinding('style.transform')
  translate = "translate3d(0px, 0px, 0px)";

  constructor(public ren: Renderer2, private element: ElementRef) {
    this._nativeElement = element.nativeElement;
    ren.setStyle(this._nativeElement, "position", "absolute");
    ren.setStyle(this._nativeElement, "-webkit-transition", "-webkit-transform 0.5s ease-out");
    ren.setStyle(this._nativeElement, "-moz-transition", "-moz-transform 0.5s ease-out");
    ren.setStyle(this._nativeElement, "-ms-transform", "-ms-transform 0.5s ease-out");
    ren.setStyle(this._nativeElement, "transition", "transform 0.5s ease-out");
  }

  easeOutMove(movementX: number, movementY: number) {
    if (this._isinitialized) {
      this.tx -= movementX * this.speed;
      this.ty -= movementY * this.speed;
      this.translate = "translate3d(" + this.tx + "px, " + this.ty + "px, 0px)";
    }
  }

  ngAfterContentInit() {
    this._isinitialized = true;
  }

}