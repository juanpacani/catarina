import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';

@Component({
  selector: 'cat-button',
  imports: [Icon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() variant: 'primary' | 'secondary' | 'contrast' | 'outline' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() iconLeft?: string;
  @Input() iconCenter?: string;
  @Input() iconRight?: string;
  @Input() customClass = '';
  
  @Output() clicked = new EventEmitter<MouseEvent>();
  
  get buttonClasses(): string {
    return `${this.variant} ${this.size} ${this.customClass}`;
  }
  
  get iconSize(): string {
    const sizes = { sm: '16px', md: '20px', lg: '24px' };
    return sizes[this.size];
  }
  
  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
