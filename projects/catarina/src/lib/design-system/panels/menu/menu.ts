import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, inject, Input, OnDestroy, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { Icon } from '../../icon/icon';

@Component({
  selector: 'cat-menu',
  imports: [Icon],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements AfterViewInit, OnDestroy {
  /* @Input() variant: 'surface' | 'elevated' | 'outlined' = 'surface';
  @Input() customClass: string = '';

  @HostBinding('attr.data-menu-class') get dataCustomClass() {
    return this.customClass;
  }

  get menuClasses(): string {
    return `${this.variant} ${this.customClass}`;
  } */

  @ViewChild('menuContainer', { static: false }) menuContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('menuContent', { static: false }) menuContent!: ElementRef<HTMLDivElement>;
  @ViewChild('dropdown', { static: false }) dropdown?: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;

  showMoreButton = signal(false);
  isDropdownOpen = signal(false);
  overflowItems = signal<HTMLElement[]>([]);

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      this.checkOverflow();
      this.setupObservers();
    }, 0);
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }

  private setupObservers() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.resizeObserver = new ResizeObserver(() => {
      this.checkOverflow();
    });
    this.resizeObserver.observe(this.menuContent.nativeElement);

    document.addEventListener('click', this.handleOutsideClick);
  }

  private handleOutsideClick = (event: MouseEvent) => {
    if (!this.isDropdownOpen()) return;

    const target = event.target as HTMLElement;
    const clickedInside = this.menuContainer.nativeElement.contains(target) ||
      this.dropdown?.nativeElement.contains(target);

    if (!clickedInside) {
      this.isDropdownOpen.set(false);
    }
  };

  private checkOverflow() {
    // Si el dropdown está abierto, no recalcula el overflow
    if (this.isDropdownOpen()) {
      const overflowItems = this.overflowItems();
      if (overflowItems.length > 0) {
        this.showMoreButton.set(true);
        setTimeout(() => {
          //this.waitForDropdownAndUpdate();
          this.updateDropdownContent();
        }, 0);
      }
      return;
    }

    const container = this.menuContent.nativeElement;

    // Restaura todos los elementos que puedan estar en el dropdown
    this.restoreOverflowItems();

    const items = Array.from(container.children) as HTMLElement[];

    if (items.length === 0) {
      this.showMoreButton.set(false);
      this.overflowItems.set([]);
      return;
    }

    const menuItems = items.filter(item =>
      !item.classList.contains('more-button')
    );

    if (menuItems.length === 0) {
      this.showMoreButton.set(false);
      this.overflowItems.set([]);
      return;
    }

    // Restaura todos los elementos a su estado visible antes de calcular
    menuItems.forEach(item => {
      item.style.display = '';
    });

    // Fuerza un reflow para obtener posiciones correctas
    container.offsetHeight;

    // Detecta elementos en la primera fila vs elementos en filas adicionales
    const firstItemTop = menuItems[0]?.getBoundingClientRect().top;
    const firstRowItems: HTMLElement[] = [];
    const overflowItems: HTMLElement[] = [];

    menuItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      // Usa tolerancia de 1px para manejar diferencias de redondeo
      if (Math.abs(itemTop - firstItemTop) <= 1) {
        firstRowItems.push(item);
      } else {
        overflowItems.push(item);
      }
    });

    // Si hay elementos en overflow, muestra el botón More y oculta los elementos overflow
    const needsMoreButton = overflowItems.length > 0;
    this.showMoreButton.set(needsMoreButton);

    // Oculta elementos que están en la segunda fila o más
    overflowItems.forEach(item => {
      item.style.display = 'none';
    });

    // Mantiene visibles solo los elementos de la primera fila
    firstRowItems.forEach(item => {
      item.style.display = '';
    });

    if (needsMoreButton) {
      this.overflowItems.set(overflowItems);
    } else {
      this.overflowItems.set([]);
    }
  }

  private updateDropdownContent() {
    const menuWrapper = this.menuContainer.nativeElement.closest('.menu-wrapper');
    if (!menuWrapper) {
      return;
    }

    const dropdown = menuWrapper.querySelector('.dropdown') as HTMLElement;
    if (!dropdown) {
      return;
    }

    const dropdownContent = dropdown.querySelector('.dropdown-content');
    if (!dropdownContent) {
      return;
    }

    // Limpia el contenido previo del dropdown (por si hay algún elemento)
    this.restoreOverflowItems();

    const overflowItems = this.overflowItems();

    if (overflowItems.length === 0) {
      return;
    }

    //const menuContent = this.menuContent.nativeElement; //No se usa porque los elementos ya están en el dropdown

    overflowItems.forEach(item => {
      // Mueve el elemento real al dropdown
      // El elemento ya está oculto (display: none), así que lo hace visible y lo mueve al dropdown
      item.style.display = '';
      item.style.visibility = 'visible';

      // Mueve el elemento al dropdown
      dropdownContent.appendChild(item);
    });
  }

  // Esta función sirve para mover los elementos del dropdown al menu-content
  // NO los elimina del signal overflowItems, ni del DOM, (por lo que genera sobrecarga de memoria)
  private restoreOverflowItems() {
    const overflowItems = this.overflowItems();
    const menuContent = this.menuContent.nativeElement;

    overflowItems.forEach(item => {
      // Si el elemento está en el dropdown, lo mueve de vuelta al menu-content
      const dropdownContent = item.closest('.dropdown-content');
      if (dropdownContent && item.parentElement === dropdownContent) {
        // Oculta el elemento y lo mueve de vuelta al menu-content
        item.style.display = 'none';
        menuContent.appendChild(item);
      }
    });
  }

  toggleDropdown() {
    const newState = !this.isDropdownOpen();

    if (!newState) {
      // Si se está cerrando, restaura los elementos a su posición original
      this.restoreOverflowItems();
    }

    this.isDropdownOpen.set(newState);

    if (newState) {
      // Recalcula el overflow antes de abrir el dropdown
      setTimeout(() => {
        this.checkOverflow();
        // Esperar a que el dropdown esté en el DOM antes de actualizar
        //this.waitForDropdownAndUpdate();
        this.updateDropdownContent();
      }, 0);
    }
  }
}