Feature: User Authentication tests

  Background:
    Given User navigates to the application
    And User click on the login link

  Scenario: Login should be success
    And User enter the username as "ortoni1a"
    And User enter the password as "Pass1234"
    When User click on the login button
    Then Login should be success
    And user should get logout from page

  Scenario: Login should not be success
    Given User enter the username as "koushik"
    Given User enter the password as "Passkoushik"
    When User click on the login button
    But Login should fail
    #And user should get logout from page