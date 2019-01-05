import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-feature',
  templateUrl: './editor-feature.component.html',
  styleUrls: ['./editor-feature.component.scss']
})
export class EditorFeatureComponent implements OnInit {
  @ViewChild('markdownEditor')
  markdownEditor: ElementRef;

  editorValue;

  onEditorKeyUp(event) {
    this.editorValue = event.target.value;
  }

  ngOnInit() {
    this.editorValue = this.markdownEditor.nativeElement.value;
  }
}
