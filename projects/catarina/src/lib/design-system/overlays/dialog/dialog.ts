import { Component, EventEmitter, Input, Output, OnDestroy, OnInit, inject, ViewContainerRef, TemplateRef, ViewChild } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Drag } from '../../../directives/drag';

@Component({
  selector: 'cat-dialog',
  imports: [Drag],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog implements OnInit, OnDestroy {
  // Inyecta el servicio Overlay del CDK
  private overlay = inject(Overlay);
  // ViewContainerRef necesario para crear el TemplatePortal
  private viewContainerRef = inject(ViewContainerRef);
  // Referencia al overlay creado
  private overlayRef?: OverlayRef;

  @Input() variant: 'surface' | 'outlined' | 'elevated' = 'surface';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() customClass = '';
  @Output() closs = new EventEmitter<boolean>();

  // Referencia al template que contiene el ng-content
  @ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;

  private createOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    return {
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      panelClass: ['cat-dialog-overlay-panel', this.variant, this.size, this.customClass],
    };
  }

  private openDialog() {
    const config = this.createOverlayConfig();
    
    this.overlayRef = this.overlay.create(config);
    
    // TemplatePortal permite renderizar un template (con ng-content) dentro del overlay
    const portal = new TemplatePortal(this.dialogTemplate, this.viewContainerRef);
    
    this.overlayRef.attach(portal);
    
    // Escucha cuando se hace clic en el backdrop y cierra el dialog
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeDialog();
    });
    
    // Escucha la tecla Escape para cerrar
    this.overlayRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = undefined;
      this.closs.emit(false);
    }
  }

  get dialogClasses(): string {
    return `${this.variant} ${this.size} ${this.customClass}`;
  }

  ngOnInit() {
    this.openDialog();
  }

  ngOnDestroy() {
    this.closeDialog();
  }
}