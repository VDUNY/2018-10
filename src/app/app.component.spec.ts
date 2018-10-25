import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { mockComponent } from 'src/util/component.mock';
import { DisplayService } from './calc/display/display.service';
import { mockDisplayService } from '../util/display.service.mock';

describe('AppComponent', () => {
  let component: AppComponent;
  let display: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        mockComponent({
          selector: 'app-button',
          inputs: ['value'],
          outputs: ['pressed'],
        }),
        mockComponent({
          selector: 'app-calc',
          funcs: [ 'flip' ],
        }),
      ],
      providers: [
        { provide: DisplayService, useValue: mockDisplayService() },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    display = TestBed.get(DisplayService);
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('handleKeyDown', () => {
    let fakeEvent: any;
    let fakeCalc: any;

    beforeEach(() => {
      fakeCalc = {
        flip: jasmine.createSpy('flip'),
      };
      component.calc = fakeCalc;
    });

    it('should do nothing for a bogus key code', () => {
      fakeEvent = { code: 'Bogus' };
      component.handleKeyDown(fakeEvent);
      expect(display.clearDisplay).not.toHaveBeenCalled();
      expect(display.addToDisplay).not.toHaveBeenCalled();
      expect(component.calc.flip).not.toHaveBeenCalled();
    });
    it('should clear the display on KeyC', () => {
      fakeEvent = { code: 'KeyC' };
      component.handleKeyDown(fakeEvent);
      expect(display.clearDisplay).toHaveBeenCalled();
      expect(display.addToDisplay).not.toHaveBeenCalled();
      expect(component.calc.flip).not.toHaveBeenCalled();

    });
    it('should flip on Space if calc exists', () => {
      fakeEvent = { code: 'Space' };
      component.handleKeyDown(fakeEvent);
      expect(display.clearDisplay).not.toHaveBeenCalled();
      expect(display.addToDisplay).not.toHaveBeenCalled();
      expect(component.calc.flip).toHaveBeenCalled();
    });
    it('should not flip on Space if calc does not exist', () => {
      const oldCalc = component.calc;
      component.calc = undefined;
      fakeEvent = { code: 'Space' };
      component.handleKeyDown(fakeEvent);
      expect(display.clearDisplay).not.toHaveBeenCalled();
      expect(display.addToDisplay).not.toHaveBeenCalled();
      expect(oldCalc.flip).not.toHaveBeenCalled();
    });
    it('should add to display for any other matching character', () => {
      fakeEvent = { code: '' };
      component.handleKeyDown(<any>{ code: 'Digit1', key: '1' });
      component.handleKeyDown(<any>{ code: 'Digit2', key: '2' });
      component.handleKeyDown(<any>{ code: 'Digit3', key: '3' });
      component.handleKeyDown(<any>{ code: 'Digit4', key: '4' });
      component.handleKeyDown(<any>{ code: 'Digit5', key: '5' });
      component.handleKeyDown(<any>{ code: 'Digit6', key: '6' });
      component.handleKeyDown(<any>{ code: 'Digit7', key: '7' });
      component.handleKeyDown(<any>{ code: 'Digit8', key: '8' });
      component.handleKeyDown(<any>{ code: 'Digit9', key: '9' });
      component.handleKeyDown(<any>{ code: 'Digit0', key: '0' });
      component.handleKeyDown(<any>{ code: 'Period', key: '.' });
      expect(display.clearDisplay).not.toHaveBeenCalled();
      expect(display.addToDisplay).toHaveBeenCalledTimes(11);
      expect(component.calc.flip).not.toHaveBeenCalled();
    });
  });
});
