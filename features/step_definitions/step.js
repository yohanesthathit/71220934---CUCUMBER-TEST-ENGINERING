import { expect, should } from "chai";
import { Builder, By, until } from "selenium-webdriver";
import { When, Then, Given, setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(30000);
let driver;
// Given("the user is on the login page", async function () {
//  driver = new Builder().forBrowser("chrome").build();
//  await driver.get("https://www.saucedemo.com/");
// });
// When("the user enters a valid username and password", async function () {
//  await driver.findElement(By.id("user-name")).sendKeys("standard_user");
//  await driver.findElement(By.id("password")).sendKeys("secret_sauce");
// });
// When("the user clicks the login button", async function () {
//  await driver.findElement(By.id("login-button")).click();
//  // Alternatif
//  // await driver.findElement(By.css("input[type='submit']")).click();
// });
// Then("the user should see a success message", async function () {
//  const message = await driver
//  .wait(until.elementLocated(By.className("title")), 5000)
//  .getText();
//  expect(message).to.equal("Products");
//  const item = await driver.findElement(By.id("item_4_img_link"));
//  expect(item).to.exist;
//  await driver.quit();
// });

// Scenario 1: Failed login with invalid credential
Given("the user is on the login page", async function () {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://www.saucedemo.com/");
});

When("the user enters an invalid username and password", async function () {
  await driver.findElement(By.id("user-name")).sendKeys("invalid_user");
  await driver.findElement(By.id("password")).sendKeys("wrong_password");
});

When("the user clicks the login button", async function () {
  await driver.findElement(By.id("login-button")).click();
});

Then("the user should see a failed message", async function () {
  const errorMessage = await driver
    .wait(until.elementLocated(By.css("h3[data-test='error']")), 5000)
    .getText();
  expect(errorMessage).to.include("Username and password do not match");
  await driver.quit();
});

// Scenario 2: Successfully adding an item to cart
Given("the user is on the item page", async function () {
  await driver.findElement(By.id("user-name")).clear();
  await driver.findElement(By.id("password")).clear();
  await driver.findElement(By.id("user-name")).sendKeys("standard_user");
  await driver.findElement(By.id("password")).sendKeys("secret_sauce");
  await driver.findElement(By.id("login-button")).click();
  await driver.wait(until.urlContains("inventory.html"), 5000);
});

When("the user add item to the cart", async function () {
  await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
});

When("the user in the item list", async function () {
  // No additional action needed, already on item list
});

Then("item should be seen in the item page", async function () {
  const cartBadge = await driver.findElement(By.className("shopping_cart_badge"));
  const badgeText = await cartBadge.getText();
  expect(badgeText).to.equal("1");
  await driver.quit();
});

// Scenario 3: Successfully removing an item from cart
When("the user remove item to the cart", async function () {
  await driver.findElement(By.id("remove-sauce-labs-backpack")).click();
});

Then("item shouldn't be seen in the item page", async function () {
  const badges = await driver.findElements(By.className("shopping_cart_badge"));
  expect(badges.length).to.equal(0);
  await driver.quit();
});