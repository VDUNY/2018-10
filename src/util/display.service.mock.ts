import { of } from 'rxjs';

export function mockDisplayService(): any {
  return {
    display$: of('0'),
    addToDisplay: jasmine.createSpy('addToDisplay'),
    clearDisplay: jasmine.createSpy('clearDisplay'),
  };
}
