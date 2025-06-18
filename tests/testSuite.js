import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';
import path from 'path';

// Helper to save screenshots
async function saveScreenshot(name) {
  const image = await driver.takeScreenshot();
  const filePath = path.join('.', `screenshot-${name}.png`);
  fs.writeFileSync(filePath, image, 'base64');
  console.log(`📸 Screenshot saved: ${filePath}`);
}

const options = new chrome.Options();
options.addArguments('--headless', '--disable-gpu', '--no-sandbox');

const driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

const baseUrl = 'http://localhost:5173';

async function runTests() {
  try {
    await driver.get(baseUrl);
    console.log('✅ 1. Homepage loaded');
    await driver.sleep(1000);
    await saveScreenshot('01-homepage');

    const title = await driver.getTitle();
    console.log('✅ 2. Page title:', title);
    await saveScreenshot('02-title');

    await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);
    console.log('✅ 3. Login form is visible');
    await saveScreenshot('03-login-form');

    const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
    await submitBtn.click();
    console.log('✅ 4. Submitted empty login');
    await driver.sleep(1000);
    await saveScreenshot('04-empty-login');

    await driver.findElement(By.css('input[placeholder="Email"]')).sendKeys('invalid@test.com');
    await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys('wrongpass');
    await submitBtn.click();
    console.log('✅ 5. Submitted invalid login');
    await driver.sleep(1000);
    await saveScreenshot('05-invalid-login');

    await driver.findElement(By.css('input[placeholder="Email"]')).clear();
    await driver.findElement(By.css('input[placeholder="Password"]')).clear();
    await driver.findElement(By.css('input[placeholder="Email"]')).sendKeys('test@example.com');
    await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys('123456');
    await submitBtn.click();
    console.log('✅ 6. Submitted valid login');
    await driver.sleep(2000);
    await saveScreenshot('06-valid-login');

    console.log('✅ 7. Simulated wait for post-login state');

    try {
      const menuBtn = await driver.findElement(By.css('.menu-button, .hamburger, .nav-toggle'));
      await menuBtn.click();
      console.log('☰ 8. Opened mobile nav menu');
    } catch {
      console.log('ℹ️ 8. No mobile menu found or needed');
    }
    await saveScreenshot('07-after-login');

    const servicesLink = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'services')]")),
      7000
    );
    try {
      await driver.executeScript("arguments[0].scrollIntoView(true);", servicesLink);
      await driver.wait(until.elementIsVisible(servicesLink), 3000);
    } catch {
      console.warn('⚠️ 9. Services not interactable – clicking via JS');
    }
    await driver.executeScript("arguments[0].click();", servicesLink);
    console.log('✅ 9. Navigated to Services page');
    await driver.sleep(1500);
    await saveScreenshot('08-services');

    const aboutLink = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'about')]")),
      7000
    );
    try {
      await driver.executeScript("arguments[0].scrollIntoView(true);", aboutLink);
      await driver.wait(until.elementIsVisible(aboutLink), 3000);
    } catch {
      console.warn('⚠️ 10. About not interactable – clicking via JS');
    }
    await driver.executeScript("arguments[0].click();", aboutLink);
    console.log('✅ 10. Navigated to About page');
    await driver.sleep(1500);
    await saveScreenshot('09-about');

    console.log('🎉 Test suite completed successfully!');
  } catch (err) {
    console.error('❌ Test failed:', err.message);
    try {
      await saveScreenshot('failure');
    } catch (screenshotError) {
      console.error('📸 Screenshot failed:', screenshotError.message);
    }
  } finally {
    await driver.quit();
  }
}

runTests();
