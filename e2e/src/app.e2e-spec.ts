import { AppPage } from './app.po';
import { browser, protractor } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should navigate to the main page', () => {
    page.navigateTo();
  });

  it('should smash the 1 button 10 times', () => {
    page.click(page.b1);
    page.click(page.b1);
    page.click(page.b1);
    page.click(page.b1);
    page.click(page.b1);
    page.click(page.b1);
    page.click(page.b1);
    page.click(page.b1);
    page.click(page.b1);
    page.click(page.b1);

    page.display.getText().then((displayText: String) => {
      expect(displayText).toEqual('1111111111');
    });
  });

  it('should clear the text', () => {
    page.click(page.bClear);

    page.display.getText().then((displayText: String) => {
      expect(displayText).toEqual('0');
    });
  });

  it('should flip the calculator', () => {
    page.calc.isPresent().then((isPresent: boolean) => {
      expect(isPresent).toBeTruthy();
    });
    page.invertedCalc.isPresent().then((isPresent: boolean) => {
      expect(isPresent).toBeFalsy();
    });

    page.click(page.bFlip);
    browser.sleep(page.animationTimeout);

    page.calc.isPresent().then((isPresent: boolean) => {
      expect(isPresent).toBeFalsy();
    });
    page.invertedCalc.isPresent().then((isPresent: boolean) => {
      expect(isPresent).toBeTruthy();
    });
  });

  it('should flip the calculator back', () => {
    page.click(page.bFlip);
    browser.sleep(page.animationTimeout);

    page.calc.isPresent().then((isPresent: boolean) => {
      expect(isPresent).toBeTruthy();
    });
    page.invertedCalc.isPresent().then((isPresent: boolean) => {
      expect(isPresent).toBeFalsy();
    });
  });

  it('should smash the other buttons', () => {
    page.click(page.b2);
    page.click(page.b3);
    page.click(page.b4);
    page.click(page.bDot);
    page.click(page.b5);
    page.click(page.b6);
    page.click(page.b7);
    page.click(page.b8);
    page.click(page.b9);
    page.click(page.b0);

    page.display.getText().then((displayText: String) => {
      expect(displayText).toEqual('234.567890');
    });
  });

  it('should clear with keyboard', () => {
    browser.actions().sendKeys('C').perform();

    page.display.getText().then((displayText: String) => {
      expect(displayText).toEqual('0');
    });
  });

  it('should type with keyboard', () => {
    browser.actions().sendKeys('1234567890').perform();

    page.display.getText().then((displayText: String) => {
      expect(displayText).toEqual('1234567890');
    });
  });

  it('should do a trick', () => {
    browser.actions().sendKeys('C').perform();
    browser.actions().sendKeys('.07734').perform();
    page.click(page.footer);
    browser.actions().sendKeys(protractor.Key.SPACE).perform();
    browser.sleep(page.animationTimeout);

    page.calc.isPresent().then((isPresent: boolean) => {
      expect(isPresent).toBeFalsy();
    });
    page.invertedCalc.isPresent().then((isPresent: boolean) => {
      expect(isPresent).toBeTruthy();
    });
    page.display.getText().then((displayText: String) => {
      expect(displayText).toEqual('0.07734');
    });
  });

  it('should pause for admiration', () => {
    browser.sleep(page.defaultTimeout);
  });
});
