import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../core/store';
import * as fromAuth from '../../../core/store/selectors/auth.selectors';

@Component({
  selector: 'app-editor-feature',
  templateUrl: './editor-feature.component.html',
  styleUrls: ['./editor-feature.component.scss']
})
export class EditorFeatureComponent implements OnInit {
  authenticated$: Observable<boolean> = this.store.select(
    fromAuth.selectAuthenticated
  );

  editorValue;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {}

  onEditorKeyUp(event) {
    this.editorValue = event;
  }
}
