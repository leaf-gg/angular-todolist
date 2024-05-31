import { FontWeightResizerDirective } from '../../fontWeightResizer.directive';
import { Component } from "@angular/core";

@Component({
  imports: [ FontWeightResizerDirective],
  standalone: true,
  template: `<h2 fontWeightResizer="bold"> Testing directive </h2>`

})

export class TestFontWeightResizerDirectiveComponent{}
