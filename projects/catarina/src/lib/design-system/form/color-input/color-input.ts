import { Component, forwardRef, Input } from '@angular/core';
import { Icon as CIcon } from '../../icon/icon';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cat-color-input',
  imports: [CIcon],
    providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorInput),
    multi: true
  }],
  templateUrl: './color-input.html',
  styleUrl: './color-input.css',
})
export class ColorInput implements ControlValueAccessor {
  value: string = '#000000';
  @Input() icon?: boolean = false;
  @Input() size: string ='2em';

  private onChange = (value: any) => { };
  onTouched = () => { };

  onInput(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.onChange(newValue); // informa al padre    
  }

  // Métodos requeridos por ControlValueAccessor
  writeValue(value: any): void {
    this.value = value || '#000000';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {

    this.onTouched = fn;
  }
}
