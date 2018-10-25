import { TestBed, inject } from '@angular/core/testing';

import { DisplayService } from './display.service';

import Spy = jasmine.Spy;

describe('DisplayService', () => {
  let display: DisplayService;
  let _display: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisplayService]
    });

    display = TestBed.get(DisplayService);
    _display = <any>display;
    spyOn(_display, 'update');
  });

  it('should be created', inject([DisplayService], (service: DisplayService) => {
    expect(service).toBeTruthy();
  }));

  it('should have a defined display$', () => {
    expect(display.display$).toBeDefined();
  });

  it('should start its display at 0', () => {
    expect(_display.display).toEqual('0');
  });

  describe('addToDisplay', () => {
    it('should update the display with some numbers', () => {
      display.addToDisplay('1');
      display.addToDisplay('2');
      display.addToDisplay('3');
      display.addToDisplay('4');

      expect(_display.display).toEqual('1234');
      expect(_display.update).toHaveBeenCalledTimes(4);
    });

    it('should not call update if the display has 10 or more characters', () => {
      display.addToDisplay('1');
      display.addToDisplay('2');
      display.addToDisplay('3');
      display.addToDisplay('4');
      display.addToDisplay('5');
      display.addToDisplay('6');
      display.addToDisplay('7');
      display.addToDisplay('8');
      display.addToDisplay('9');
      display.addToDisplay('0');
      display.addToDisplay('1');
      display.addToDisplay('2');
      display.addToDisplay('3');

      expect(_display.display).toEqual('1234567890');
      expect(_display.update).toHaveBeenCalledTimes(10);
    });

    it('should not allow leading zeros', () => {
      display.addToDisplay('0');
      display.addToDisplay('0');
      display.addToDisplay('0');
      display.addToDisplay('0');

      expect(_display.display).toEqual('0');
      expect(_display.update).toHaveBeenCalledTimes(4);
    });

    it('should allow leading zeros after decimal', () => {
      display.addToDisplay('.');
      display.addToDisplay('0');
      display.addToDisplay('0');
      display.addToDisplay('0');

      expect(_display.display).toEqual('0.000');
      expect(_display.update).toHaveBeenCalledTimes(4);
    });

    it('should only allow a single decimal point', () => {
      display.addToDisplay('1');
      display.addToDisplay('2');
      display.addToDisplay('.');
      display.addToDisplay('3');
      display.addToDisplay('4');
      display.addToDisplay('.');
      display.addToDisplay('5');

      expect(_display.display).toEqual('12.345');
      expect(_display.update).toHaveBeenCalledTimes(6);
    });
  });

  describe('clearDisplay', () => {
    beforeEach(() => {
      _display.display = '12345';

      display.clearDisplay();
    });

    it('should reset display to 0', () => {
      expect(_display.display).toEqual('0');
    });

    it('should update the display', () => {
      expect(_display.update).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should call next on subject with display', () => {
      (<Spy>(_display.update)).and.callThrough();
      spyOn(_display.subject, 'next');

      _display.update();

      expect(_display.subject.next).toHaveBeenCalledWith(_display.display);
    });
  });
});
