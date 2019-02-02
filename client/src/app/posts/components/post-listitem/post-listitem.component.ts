import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-listitem',
  templateUrl: './post-listitem.component.html',
  styleUrls: ['./post-listitem.component.scss']
})
export class PostListItemComponent {
  @Input()
  post;
}
