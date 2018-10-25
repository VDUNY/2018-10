import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalcComponent } from './calc/calc.component';
import { DisplayComponent } from './calc/display/display.component';
import { ButtonComponent } from './calc/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcComponent,
    DisplayComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
