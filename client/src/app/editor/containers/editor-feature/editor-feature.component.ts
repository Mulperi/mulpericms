import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../core/store';
import * as fromPost from '../../../core/store/selectors/post.selectors';
import * as fromAuth from '../../../core/store/selectors/auth.selectors';
import * as postAction from '../../../core/store/actions/post.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editor-feature',
  templateUrl: './editor-feature.component.html',
  styleUrls: ['./editor-feature.component.scss']
})
export class EditorFeatureComponent implements OnInit {
  @ViewChild('markdownEditor')
  markdownEditor: ElementRef;

  editorValue;

  saving$: Observable<boolean> = this.store.select(fromPost.selectPostSaving);
  authenticated$: Observable<boolean> = this.store.select(
    fromAuth.selectAuthenticated
  );

  onEditorKeyUp(event) {
    this.editorValue = event.target.value;
  }

  onSave() {
    this.store.dispatch(new postAction.SavePost(this.editorValue));
  }

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.editorValue = this.markdownEditor.nativeElement.value;
  }
}
