import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Injectable()
export class ScrollService {
  private subscription: Subscription;
  private currentElement: HTMLElement;
  private readonly NumSteps: number = 50;
  constructor() {
  }

  scroll(duration: number, steps: any, targetElement: HTMLElement, beforeScroll: EventEmitter<MouseEvent>, afterScroll: EventEmitter<MouseEvent>, mouseEvent: MouseEvent) {
    if (this.currentElement !== targetElement) {
      this.currentElement = targetElement;
      let scrollY = targetElement.getBoundingClientRect().top;
      if (this.subscription !== undefined && !this.subscription.closed) {
        this.subscription.unsubscribe();
      }
      beforeScroll.emit(mouseEvent);
      this.subscription = Observable.interval(duration / this.NumSteps).take(this.NumSteps).subscribe(
        t => {
          let scroll = Math.round(steps[t] * scrollY);
          window.scrollBy(0, scroll);
        },
        error => {
          console.log(error);
        },
        () => {
          this.currentElement = null;
          afterScroll.emit(mouseEvent);
        }
      );
    }
  }

  getEasingPattern(type:string, time:number) {
    switch (type) {
      case 'easeInQuad': return time * time; // accelerating from zero velocity
      case 'easeOutQuad': return time * (2 - time); // decelerating to zero velocity
      case 'easeInOutQuad': return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
      case 'easeInCubic': return time * time * time; // accelerating from zero velocity
      case 'easeOutCubic': return (--time) * time * time + 1; // decelerating to zero velocity
      case 'easeInOutCubic': return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
      case 'easeInQuart': return time * time * time * time; // accelerating from zero velocity
      case 'easeOutQuart': return 1 - (--time) * time * time * time; // decelerating to zero velocity
      case 'easeInOutQuart': return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
      case 'easeInQuint': return time * time * time * time * time; // accelerating from zero velocity
      case 'easeOutQuint': return 1 + (--time) * time * time * time * time; // decelerating to zero velocity
      case 'easeInOutQuint': return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
      default: return time;
    }
  };

  getSteps(timingFunction: string) {
    return Array.from(Array(this.NumSteps).keys()).map(t => {
      return (this.getEasingPattern(timingFunction, (t + 1) / this.NumSteps) - this.getEasingPattern(timingFunction, (t) / this.NumSteps));
    });
  }

}
