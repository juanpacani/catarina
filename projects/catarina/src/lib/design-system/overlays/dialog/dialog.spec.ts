import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { Dialog } from './dialog';

describe('Dialog', () => {
  let component: Dialog;
  let fixture: ComponentFixture<Dialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Dialog,
        // OverlayModule proporciona el servicio Overlay del CDK para los tests
        OverlayModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dialog);
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

  it('should calculate dialog classes correctly', () => {
    component.variant = 'elevated';
    component.size = 'lg';
    component.customClass = 'custom-dialog';
    expect(component.dialogClasses).toBe('elevated lg custom-dialog');
  });
});
