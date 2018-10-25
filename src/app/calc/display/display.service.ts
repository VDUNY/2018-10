import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  public display$: Observable<string>;

  private subject: Subject<string> = new Subject<string>();
  private display: string = '0';

  constructor() {
    this.update();
    this.display$ = this.subject.asObservable();
  }

  addToDisplay(input: string): void {
    if (this.display.length >= 10) {
      return;
    }
    else if (this.display === '0') {
      this.display = input === '.' ? '0.' : input;
      this.update();
    }
    else if (input === '.' && this.display.indexOf('.') !== -1) {
      return;
    } else {
      this.display = this.display + input;
      this.update();
    }
  }

  clearDisplay(): void {
    this.display = '0';
    this.update();
  }

  private update(): void {
    this.subject.next(this.display);
  }
}
