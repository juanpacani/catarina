import { NgFor, NgClass, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Input, OnDestroy, Output, PLATFORM_ID, inject, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CatInput } from "../cat-input/cat-input";

@Component({
  selector: 'cat-select-input',
  imports: [
    NgFor,
    CatInput,
    NgClass
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectInput),
    multi: true
  }],
  templateUrl: './select-input.html',
  styleUrl: './select-input.css',
})
export class SelectInput implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @ViewChild('input') inputEl!: ElementRef<HTMLElement>;
  @ViewChild('optionsContainer', { static: false }) optionsContainer!: ElementRef<HTMLElement>;

  @Input() transform?: string; //This option basicly allow to the consumer put the options at the side where he wants
  @Input() options?: string[];
  @Input() placeholder: string = '';
  @Input() type: 'string' | 'number' = 'string';

  value: string | number = '';
  active = false;
  isInsideMenu = false;

  @Input() variant: 'surface' | 'elevated' | 'outlined' = 'surface';
  @Input() scrolleable: boolean = false;
  @Input() customClass: string = '';

  //@Output() selected = new EventEmitter<string>();

  //Accesibility
  @HostListener('document:click', ['$event'])
  outerClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.active = false;
      this.updateDropdownPosition();
    }
  };

  private updateDropdownPosition() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.isInsideMenu || !this.active || !this.optionsContainer) {
      return;
    }

    // Calcular posición cuando está dentro del menú
    const inputRect = this.inputEl.nativeElement.getBoundingClientRect();
    const optionsEl = this.optionsContainer.nativeElement;
    
    // Posicionar el dropdown debajo del input usando position fixed
    optionsEl.style.position = 'fixed';
    optionsEl.style.top = `${inputRect.bottom}px`;
    optionsEl.style.left = `${inputRect.left}px`;
    optionsEl.style.width = `${inputRect.width}px`;
    optionsEl.style.zIndex = '1001';
  }

  toggleActive() {
    this.active = !this.active;
    if (this.active && this.isInsideMenu) {
      // Esperar un tick para que el DOM se actualice
      setTimeout(() => {
        this.updateDropdownPosition();
      }, 0);
    }
  }

  constructor(
    private el: ElementRef,
  ) { }

  private platformId = inject(PLATFORM_ID);
  private scrollHandler?: () => void;
  private resizeHandler?: () => void;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Detectar si el select está dentro de un menú
    this.isInsideMenu = !!this.el.nativeElement.closest('cat-menu');
    
    // Añadir listeners para actualizar posición en scroll/resize
    if (this.isInsideMenu) {
      this.scrollHandler = () => {
        if (this.active) {
          this.updateDropdownPosition();
        }
      };
      this.resizeHandler = () => {
        if (this.active) {
          this.updateDropdownPosition();
        }
      };
      
      window.addEventListener('scroll', this.scrollHandler, true);
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler, true);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  onChange = (value: any) => { };
  onTouched = () => { };

  //Here starts the events from ControlValueAccesor
  writeValue(value: any): void {
    this.value = value;
  };
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  //Here ends The events from ControlValueAccesor

  choseValue(option: any) {
    this.value = option;
    this.onChange(option);
    this.onTouched();
    this.active = false;
    //this.selected.emit(option);
  };

  @HostBinding('attr.data-select-input-class') get dataCustomClass() {
    return this.customClass;
  }

  get selectInputClass(): string {
    return `${this.variant} ${this.scrolleable ? 'scrolleable' : ''}`;
  }
}
