import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { Drawer } from './drawer';

describe('Drawer', () => {
  let component: Drawer;
  let fixture: ComponentFixture<Drawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Drawer,
        // OverlayModule proporciona el servicio Overlay del CDK para los tests
        OverlayModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Drawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closs event when closed', () => {
    spyOn(component.closs, 'emit');
    component.ngOnDestroy();
    expect(component.closs.emit).toHaveBeenCalledWith(false);
  });

  it('should calculate drawer classes correctly', () => {
    component.side = 'right';
    component.variant = 'elevated';
    component.customClass = 'custom-drawer';
    expect(component.drawerClasses).toBe('elevated right custom-drawer');
  });

  it('should close drawer when closeDrawer is called', () => {
    spyOn(component.closs, 'emit');
    component.closeDrawer();
    expect(component.closs.emit).toHaveBeenCalledWith(false);
  });
});
