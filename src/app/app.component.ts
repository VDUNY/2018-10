import { Component, ViewChild, HostListener } from '@angular/core';
import { CalcComponent } from './calc/calc.component';
import { DisplayService } from './calc/display/display.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(CalcComponent)
  calc: CalcComponent;

  private keys: string[] = [
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
    'Digit6',
    'Digit7',
    'Digit8',
    'Digit9',
    'Digit0',
    'KeyC',
    'Period',
    'Space',
  ];

  constructor(
    private display: DisplayService
  ) {}

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (this.keys.indexOf(event.code) === -1) {
      return;
    }

    if (event.code === 'KeyC') {
      this.display.clearDisplay();
    }
    else if (event.code === 'Space') {
      if (this.calc) {
        this.calc.flip();
      }
    }
    else {
      this.display.addToDisplay(event.key);
    }
  }
}
