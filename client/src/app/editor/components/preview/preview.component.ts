import { Store } from '@ngrx/store';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from '../../../root/store';
import * as fromAuth from '../../../root/store/selectors/auth.selectors';
import * as fromPost from '../../../root/store/selectors/post.selectors';
import * as postAction from '../../../root/store/actions/post.actions';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
  @ViewChild('tagInputField')
  tagInputField: ElementRef;

  @Input()
  editorValue: string;
  @Input()
  titleValue: string;

  date = new Date().toString().slice(0, 21);

  username$: Observable<string> = this.store.select(fromAuth.selectUsername);

  authenticated$: Observable<boolean> = this.store.select(
    fromAuth.selectAuthenticated
  );

  saving$: Observable<boolean> = this.store.select(fromPost.selectPostSaving);

  tags: string[] = [];

  constructor(private store: Store<fromStore.State>) {}

  onSave() {
    this.store.dispatch(
      new postAction.Save({
        title: this.titleValue,
        body: this.editorValue,
        tags: this.tags
      })
    );
  }

  tagInputKeyUp(event) {
    if (event.target.value.length > 2) {
      if (event.key === ',' || event.code === 'Space') {
        const tag = event.target.value.slice(0, event.target.value.length - 1);
        if (
          !this.tags.includes(tag) &&
          this.tags.length < 5 &&
          tag.length < 20
        ) {
          this.tags.push(tag);
        }
        this.tagInputField.nativeElement.value = '';
      }
    } else if (event.key === ',' || event.code === 'Space') {
      this.tagInputField.nativeElement.value = '';
    }
  }

  removeTag(removedTag: string) {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }
}
