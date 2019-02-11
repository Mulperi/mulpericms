import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class MulperiTooltipDirective implements OnInit {
  @Input() mulperiDescription: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const para = document.createElement('p');
    const text = document.createTextNode(this.mulperiDescription);

    this.el.nativeElement.appendChild(para);

    para.appendChild(text);
    para.style.background = 'rgba(0,0,0,0.8)';
    para.style['border-radius'] = '4px';
    para.style.color = 'whitesmoke';
    para.style.display = 'none';
    para.style['max-width'] = '300px';
    para.style.padding = '0.25rem 0.5rem';
    para.style.position = 'absolute';
    para.style.fontSize = '12px';
    para.style.maxWidth = '160px';

    this.el.nativeElement.onmouseover = event => {
      para.style.display = 'block';
    };

    this.el.nativeElement.onmousemove = event => {
      para.style.left = event.pageX + 'px';
      para.style.top = event.pageY + 'px';
    };

    this.el.nativeElement.onmouseout = event => {
      para.style.display = 'none';
    };
  }
}
