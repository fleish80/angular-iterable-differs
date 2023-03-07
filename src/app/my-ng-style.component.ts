import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyNgStyleDirective} from 'src/app/my-ng-style.directive';

@Component({
  selector: 'angular-iterable-differs-my-ng-style',
  standalone: true,
  imports: [CommonModule, MyNgStyleDirective],
  template: ` 
    <button (click)="changeStyle()">Change Style</button>
    <p [angularIterableDiffersMyNgStyle]="style">my-ng-style works!</p> `,
  styles: [],
})
export class MyNgStyleComponent {

  style = {color: 'green', 'font-size': '90px'};

  changeStyle() {
    this.style.color = 'red';
    this.style['text-decoration']='underline';
  }

}
