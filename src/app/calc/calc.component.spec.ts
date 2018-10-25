import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcComponent } from './calc.component';
import { mockComponent } from 'src/util/component.mock';
import { DisplayService } from './display/display.service';
import { mockDisplayService } from '../../util/display.service.mock';

describe('CalcComponent', () => {
  let _component: any;
  let component: CalcComponent;
  let fixture: ComponentFixture<CalcComponent>;
  let display: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalcComponent,
        mockComponent({ selector: 'app-display' }),
        mockComponent({
          selector: 'app-button',
          inputs: ['value'],
          outputs: ['pressed'],
        }),
      ],
      providers: [
        { provide: DisplayService, useValue: mockDisplayService() },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcComponent);
    component = fixture.componentInstance;
    _component = <any>component;
    fixture.detectChanges();

    display = TestBed.get(DisplayService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('flip', () => {
    it('should toggle flipped on', () => {
      component.flip();
      expect(_component.flipped).toBe(true);
    });

    it('should toggle flipped off', () => {
      _component.flipped = true;
      component.flip();
      expect(_component.flipped).toBe(false);
    });
  });
});
