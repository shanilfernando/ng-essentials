import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ScrollService } from '../services/scroll.service';

@Directive({
  selector: '[SmoothlyScrollTo]'
})
export class SmoothlyScrollToDirective {
  @Input() SmoothlyScrollTo: string;
  @Input() duration: number = 1000;
  @Input() timingFunction: string = 'easeOutQuad';
  @Output() beforeScroll = new EventEmitter();
  @Output() afterScroll = new EventEmitter();
  private readonly NumSteps: number = 50;
  private steps :number[];

  constructor(private scrollService: ScrollService) {
    this.steps = this.scrollService.getSteps(this.timingFunction);
    
  }

  @HostListener('click', ['$event'])
  onClick(event:MouseEvent) {
    let targetElement = document.getElementById(this.SmoothlyScrollTo);
    if (!targetElement) return;
    this.scrollService.scroll(this.duration, this.steps, targetElement,this.beforeScroll,this.afterScroll,event);
  }

}
