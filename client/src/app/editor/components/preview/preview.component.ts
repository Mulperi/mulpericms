import { Store } from '@ngrx/store';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import * as fromStore from '../../../core/store';
import * as fromAuth from '../../../core/store/selectors/auth.selectors';
import * as fromPost from '../../../core/store/selectors/post.selectors';
import { Observable } from 'rxjs';
import * as postAction from '../../../core/store/actions/post.actions';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
  @ViewChild('tagInputField')
  tagInputField: ElementRef;

  @Input()
  data;

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
      new postAction.SavePost({ body: this.data, tags: this.tags })
    );
  }

  tagInputKeyUp(event) {
    if (event.target.value.length > 2) {
      if (event.key === ',') {
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
    } else {
      if (event.key === ',') {
        this.tagInputField.nativeElement.value = '';
      }
    }
  }

  removeTag(removedTag: string) {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }
}
