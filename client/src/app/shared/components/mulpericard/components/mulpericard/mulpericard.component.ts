import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mulpericard',
  templateUrl: './mulpericard.component.html',
  styleUrls: ['./mulpericard.component.scss']
})
export class MulpericardComponent {
  @Input()
  warn;
}
