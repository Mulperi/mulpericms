import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-feature',
  templateUrl: './editor-feature.component.html',
  styleUrls: ['./editor-feature.component.scss']
})
export class EditorFeatureComponent implements OnInit {
  editorValue;

  ngOnInit() {}

  onEditorKeyUp(event) {
    this.editorValue = event;
  }
}
