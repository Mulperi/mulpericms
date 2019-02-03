import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @ViewChild('markdownEditor')
  markdownEditor: ElementRef;
  @ViewChild('titleInput')
  titleInput: ElementRef;

  @Output()
  editorKeyUp = new EventEmitter();
  @Output()
  titleKeyUp = new EventEmitter();

  ngOnInit() {
    this.editorKeyUp.emit(this.markdownEditor.nativeElement.value);
    this.titleKeyUp.emit(this.titleInput.nativeElement.value);
  }

  onEditorKeyUp(event) {
    this.editorKeyUp.emit(event.target.value);
  }
  onTitleKeyUp(event) {
    this.titleKeyUp.emit(event.target.value);
  }
}
