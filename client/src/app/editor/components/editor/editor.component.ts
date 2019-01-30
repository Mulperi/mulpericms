import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges
} from '@angular/core';
import * as postAction from '../../../core/store/actions/post.actions';
import * as fromStore from '../../../core/store';

import * as fromAuth from '../../../core/store/selectors/auth.selectors';
import * as fromPost from '../../../core/store/selectors/post.selectors';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @ViewChild('markdownEditor')
  markdownEditor: ElementRef;

  saving$: Observable<boolean> = this.store.select(fromPost.selectPostSaving);

  authenticated$: Observable<boolean> = this.store.select(
    fromAuth.selectAuthenticated
  );
  @Output()
  editorKeyUp = new EventEmitter();

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.editorKeyUp.emit(this.markdownEditor.nativeElement.value);
  }

  onEditorKeyUp(event) {
    this.editorKeyUp.emit(event.target.value);
  }

  onSave() {
    this.store.dispatch(
      new postAction.SavePost(this.markdownEditor.nativeElement.value)
    );
  }
}
