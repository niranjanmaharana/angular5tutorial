import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionComponentComponent } from './accordion-component.component';

describe('AccordionComponentComponent', () => {
  let component: AccordionComponentComponent;
  let fixture: ComponentFixture<AccordionComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
