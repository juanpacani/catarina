import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'cat-card',
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class Card {
  @Input() variant: 'surface' | 'outlined' | 'elevated' = 'surface';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() width: string = 'auto';
  @Input() customClass = '';

  // Expone las clases como atributos de datos
  @HostBinding('attr.data-card-variant') get dataVariant() {
    return this.variant;
  }
  
  @HostBinding('attr.data-card-size') get dataSize() {
    return this.size;
  }
  
  @HostBinding('attr.data-card-class') get dataCustomClass() {
    return this.customClass;
  }

  /*// También exponer como CSS Custom Properties
  @HostBinding('style.--card-variant') get cssVariant() {
    return this.variant;
  }
  
  @HostBinding('style.--card-custom-class') get cssCustomClass() {
    return this.customClass;
  }
*/
  get cardClasses(): string {
    return `cat-card ${this.variant} ${this.size} ${this.customClass}`;
  }
}