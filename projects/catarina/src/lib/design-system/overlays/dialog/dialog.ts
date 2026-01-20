import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Drag } from '../../../directives/drag';

@Component({
  selector: 'cat-dialog',
  imports: [Drag],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {
  @Output() closs = new EventEmitter<boolean>();
  @HostListener('window:keydown.escape', ['$event'])
  handleKeyDown(event: Event) {
    this.clossOverlay();
  }
  @Input() variant: 'surface' | 'outlined' | 'elevated' = 'surface';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() customClass = '';

  // Exponer las clases como atributos de datos
  @HostBinding('attr.data-card-variant') get dataVariant() {
    return this.variant;
  }

  @HostBinding('attr.data-card-size') get dataSize() {
    return this.size;
  }

  @HostBinding('attr.data-card-class') get dataCustomClass() {
    return this.customClass;
  }

  get dialogClasses(): string {
    return `${this.variant} ${this.size} ${this.customClass}`;
  }

  clossOverlay() {
    this.closs.emit(false);
  };
}
