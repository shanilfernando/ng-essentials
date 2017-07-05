import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvanceParallaxChildDirective } from './directives/advance-parallax-child.directive';
import { AdvanceParallaxDirective } from './directives/advance-parallax.directive';
import { SmoothlyScrollToDirective } from './directives/smoothly-scroll-to.directive';
import { ScrollService } from './services/scroll.service';
@NgModule({
  imports: [CommonModule],
  declarations: [AdvanceParallaxChildDirective, AdvanceParallaxDirective, SmoothlyScrollToDirective],
  exports:      [ AdvanceParallaxChildDirective, AdvanceParallaxDirective, SmoothlyScrollToDirective ],
  providers: [ScrollService],
})
export class NgEssentialsModule { }
