import { Component, OnInit } from '@angular/core';
import { DisplayService } from './display/display.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {

  constructor(
    private display: DisplayService
  ) { }

  ngOnInit() { }

}
