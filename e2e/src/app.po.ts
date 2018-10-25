import { browser, by, element, ElementFinder, promise, ProtractorExpectedConditions, protractor } from 'protractor';

export class AppPage {
  defaultTimeout: number = 120000;
  animationTimeout: number = 1000;
  EC: ProtractorExpectedConditions = protractor.ExpectedConditions;

  footer: ElementFinder = element(by.css('footer'));

  b1: ElementFinder = element(by.cssContainingText('app-button button', '1'));
  b2: ElementFinder = element(by.cssContainingText('app-button button', '2'));
  b3: ElementFinder = element(by.cssContainingText('app-button button', '3'));
  b4: ElementFinder = element(by.cssContainingText('app-button button', '4'));
  b5: ElementFinder = element(by.cssContainingText('app-button button', '5'));
  b6: ElementFinder = element(by.cssContainingText('app-button button', '6'));
  b7: ElementFinder = element(by.cssContainingText('app-button button', '7'));
  b8: ElementFinder = element(by.cssContainingText('app-button button', '8'));
  b9: ElementFinder = element(by.cssContainingText('app-button button', '9'));
  b0: ElementFinder = element(by.cssContainingText('app-button button', '0'));
  bDot: ElementFinder = element(by.cssContainingText('app-button button', '.'));
  bClear: ElementFinder = element(by.cssContainingText('app-button button', 'C'));
  bFlip: ElementFinder = element(by.cssContainingText('app-button button', 'flip'));

  display: ElementFinder = element(by.css('app-display .numbers'));

  calc: ElementFinder = element(by.css('app-calc .calculator:not(.inverted)'));
  invertedCalc: ElementFinder = element(by.css('app-calc .calculator.inverted'));

  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  click(elem: ElementFinder): promise.Promise<void> {
    browser.wait(this.EC.elementToBeClickable(elem), this.defaultTimeout);

    return browser.actions().mouseMove(elem).click().perform();
  }
}
