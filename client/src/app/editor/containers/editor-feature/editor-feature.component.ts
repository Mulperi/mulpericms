import { Component } from '@angular/core';

@Component({
  selector: 'app-editor-feature',
  templateUrl: './editor-feature.component.html',
  styleUrls: ['./editor-feature.component.scss']
})
export class EditorFeatureComponent {
  editorValue;

  onEditorKeyUp(event) {
    this.editorValue = event.target.value;
  }
}
