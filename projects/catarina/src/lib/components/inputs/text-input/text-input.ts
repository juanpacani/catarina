import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'cat-text-input',
  imports: [],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
})
export class TextInput {
  @Input() variant: 'surface' | 'outlined' | 'elevated' = 'surface';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() placeholder: string = '';
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

  get textInputClasses(): string {
    return `${this.variant} ${this.size} ${this.customClass}`;
  }
}
