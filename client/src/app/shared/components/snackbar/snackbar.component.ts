import { Component, Input } from '@angular/core';
import { transition, animate, trigger, style } from '@angular/animations';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ]),
      transition(':leave', [animate('1s', style({ opacity: 0 }))])
    ])
  ]
})
export class SnackbarComponent {
  @Input()
  message;

  @Input()
  color;
}
