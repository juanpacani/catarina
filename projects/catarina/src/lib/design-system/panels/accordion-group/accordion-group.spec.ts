import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionGroup } from './accordion-group';

describe('AccordionGroup', () => {
  let component: AccordionGroup;
  let fixture: ComponentFixture<AccordionGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
