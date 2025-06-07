Feature: Shopping Cart Management on SauceDemo

  Scenario: Failed login with invalid credential
    Given the user is on the login page
    When the user enters an invalid username and password
    And the user clicks the login button
    Then the user should see a failed message

  Scenario: Successfully adding an item to cart
    Given the user is on the login page
    And the user is on the item page
    When the user add item to the cart
    And the user in the item list
    Then item should be seen in the item page

  Scenario: Successfully removing an item from cart
    Given the user is on the login page
    And the user is on the item page
    When the user add item to the cart
    And the user in the item list
    When the user remove item to the cart
    Then item shouldn't be seen in the item page