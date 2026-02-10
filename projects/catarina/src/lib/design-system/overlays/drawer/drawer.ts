import { Component, EventEmitter, Input, Output, OnDestroy, OnInit, inject, ViewContainerRef, TemplateRef, ViewChild } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Button } from '../../button/button';

@Component({
  selector: 'cat-drawer',
  imports: [Button],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
})
export class Drawer implements OnInit, OnDestroy {
  // Inyecta el servicio Overlay del CDK
  private overlay = inject(Overlay);
  // ViewContainerRef necesario para crear el TemplatePortal
  private viewContainerRef = inject(ViewContainerRef);
  // Referencia al overlay creado
  private overlayRef?: OverlayRef;

  @Input() side: 'left' | 'right' | 'top' | 'bottom' = 'left';
  @Input() variant: 'surface' | 'elevated' | 'outlined' = 'surface';
  @Input() customClass: string = '';
  @Output() closs = new EventEmitter<boolean>();

  // Referencia al template que contiene el ng-content
  @ViewChild('drawerTemplate', { static: true }) drawerTemplate!: TemplateRef<any>;

  private createOverlayConfig(): OverlayConfig {
    // Crea estrategia de posicionamiento global
    const positionStrategy = this.overlay.position().global();
    
    switch (this.side) {
      case 'left':
        positionStrategy.left('0');
        break;
      case 'right':
        positionStrategy.right('0');
        break;
      case 'top':
        positionStrategy.top('0');
        break;
      case 'bottom':
        positionStrategy.bottom('0');
        break;
    }

    return {
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      panelClass: ['cat-drawer-overlay-panel', this.side, this.variant, this.customClass],
    };
  }

  private openDrawer() {
    const config = this.createOverlayConfig();
    

    this.overlayRef = this.overlay.create(config);
    
    // Crea un portal con el template del drawer
    // TemplatePortal permite renderizar un template (con ng-content) dentro del overlay
    const portal = new TemplatePortal(this.drawerTemplate, this.viewContainerRef);
    
    // Adjunta el portal al overlay, esto renderiza el template dentro del overlay
    this.overlayRef.attach(portal);
    
    // Escucha cuando se hace clic en el backdrop y cierra el drawer
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeDrawer();
    });
    
    // Escucha la tecla Escape para cerrar
    this.overlayRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        this.closeDrawer();
      }
    });
  }

  closeDrawer() {
    if (this.overlayRef) {
      // Desconecta el portal del overlay
      this.overlayRef.detach();
      // Limpia todos los recursos del overlay
      this.overlayRef.dispose();
      this.overlayRef = undefined;
      // Emite el evento de cierre
      this.closs.emit(false);
    }
  }

  get drawerClasses(): string {
    return `${this.variant} ${this.side} ${this.customClass}`;
  }

  ngOnInit() {
    this.openDrawer();
  }

  ngOnDestroy() {
    this.closeDrawer();
  }
}