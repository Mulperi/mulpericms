import { Component, Input } from '@angular/core';
import { CommentVO } from 'src/app/shared/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comment: CommentVO;
}
