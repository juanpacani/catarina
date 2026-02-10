import { AfterViewInit, Directive, DOCUMENT, ElementRef, Inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[CDrag]'
})
export class Drag implements AfterViewInit {
  private offsetX = 0;
  private offsetY = 0;
  private dragging = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngAfterViewInit() {
    const el = this.el.nativeElement as HTMLElement;

    // Si el elemento no tiene position seteado, establece absolute
    if (typeof window !== 'undefined') {
      const computedStyle = window.getComputedStyle(el);
      if (computedStyle.position === 'static') {
        this.renderer.setStyle(el, 'position', 'absolute');
      }
    }


    el.addEventListener('mousedown', (e: MouseEvent) => {
      this.dragging = true;
      this.offsetX = e.clientX - el.offsetLeft;
      this.offsetY = e.clientY - el.offsetTop;
      el.style.cursor = 'grabbing';
    });

    this.document.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.dragging) {
        el.style.left = e.clientX - this.offsetX + 'px';
        el.style.top = e.clientY - this.offsetY + 'px';
      }
    });

    this.document.addEventListener('mouseup', () => {
      this.dragging = false;
      el.style.cursor = 'grab';
    });
  }

}
