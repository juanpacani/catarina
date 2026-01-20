import { Component, ContentChildren, HostBinding, Input, QueryList } from '@angular/core';
import { Accordion as CAccordion } from '../accordion/accordion';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cat-accordion-group',
  imports: [],
  templateUrl: './accordion-group.html',
  styleUrl: './accordion-group.css',
})
export class AccordionGroup {
  @Input() singleExpand: boolean = true;
  @Input() customClass: string = '';

  @ContentChildren(CAccordion) accordions!: QueryList<CAccordion>;

  accordionActiveId?: String;

  sub?: Subscription | null;

  ngAfterContentInit(): void {
    if (this.singleExpand) {
      this.accordions.forEach(acc => {
        this.sub = acc.updateAccordionGroupStatusOutput.subscribe(id => {
          this.handleOpen(id);
        });
      });
    }
  }

  handleOpen(id: string) {
    this.accordions.forEach(acc => acc.forceStatus(false));
    const target = this.accordions.find(acc => acc.accordionId === id);
    if (this.accordionActiveId === id) {
      target?.forceStatus(false);
      this.accordionActiveId = undefined;
    } else {
      target?.forceStatus(true);
      this.accordionActiveId = id;
    }
  }

  @HostBinding('attr.data-accordion-group-class') get dataCustomClass() {
    return this.customClass;
  }

  get accordionGroupClasses() {
    return `${this.customClass}`;
  }
}
