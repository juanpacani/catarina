import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Button } from '../../button/button';

@Component({
  selector: 'cat-drawer',
  imports: [Button],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
})
export class Drawer {
  @Output() closs = new EventEmitter<boolean>();
  @HostListener('window:keydown.escape', ['$event'])
  handleKeyDown(event: Event) {
    this.clossOverlay();
  }

  @Input() side: 'left' | 'right' | 'top' | 'bottom' = 'left';
  @Input() variant: 'surface' | 'elevated' | 'outlined' = 'surface';
  @Input() customClass: string = '';
  
  @HostBinding('attr.data-drawer-class') get dataCustomClass() {
    return this.customClass;
  }

  get drawerClasses(): string {
    return `${this.variant} ${this.side} ${this.customClass}`;
  }

  clossOverlay() {
    this.closs.emit(false);
  };
}
