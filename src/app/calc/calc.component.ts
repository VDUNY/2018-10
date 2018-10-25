import { Component, OnInit } from '@angular/core';
import { DisplayService } from './display/display.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {

  flipped: boolean = false;
  keys: string[] = '123456789'.split('');

  constructor(
    public display: DisplayService
  ) { }

  ngOnInit() { }

  flip(): void {
    this.flipped = !this.flipped;
  }

}
