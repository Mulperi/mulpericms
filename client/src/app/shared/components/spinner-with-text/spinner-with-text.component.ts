import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-spinner-with-text',
  templateUrl: './spinner-with-text.component.html',
  styleUrls: ['./spinner-with-text.component.scss']
})
export class SpinnerWithTextComponent {

    @Input()
    message!: string;
}
