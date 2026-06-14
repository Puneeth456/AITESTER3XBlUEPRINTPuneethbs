package com.salesforce.tests;

import com.salesforce.pages.HomePage;
import com.salesforce.pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class LoginTest extends BaseTest {

    private LoginPage loginPage;

    @BeforeMethod
    public void initLoginPage() {
        loginPage = new LoginPage(driver);
    }

    @Test(priority = 1, description = "TC01 - Valid credentials should redirect to Salesforce home page")
    public void validLoginRedirectsToHomePage() {
        try {
            loginPage.doLogin(VALID_USERNAME, VALID_PASSWORD);
            HomePage homePage = new HomePage(driver);
            boolean isLoaded = homePage.isHomePageLoaded();
            Assert.assertTrue(isLoaded, "TC01 FAILED: Home page did not load after valid login");
            Assert.assertFalse(
                homePage.getCurrentUrl().contains("login.salesforce.com"),
                "TC01 FAILED: URL still points to login page after valid login. Current URL: " + homePage.getCurrentUrl()
            );
        } catch (AssertionError ae) {
            throw ae;
        } catch (Exception e) {
            throw new RuntimeException("TC01 - Valid login test threw unexpected exception: " + e.getMessage(), e);
        }
    }

    @Test(priority = 2, description = "TC02 - Invalid credentials should display error message on login page")
    public void invalidLoginShowsErrorMessage() {
        try {
            loginPage.doLogin(INVALID_USERNAME, INVALID_PASSWORD);
            boolean errorDisplayed = loginPage.isErrorMessageDisplayed();
            Assert.assertTrue(errorDisplayed, "TC02 FAILED: Error message was not displayed after invalid login");
            String errorText = loginPage.getErrorMessageText();
            Assert.assertFalse(
                errorText.isEmpty(),
                "TC02 FAILED: Error message element is visible but contains no text"
            );
        } catch (AssertionError ae) {
            throw ae;
        } catch (Exception e) {
            throw new RuntimeException("TC02 - Invalid login test threw unexpected exception: " + e.getMessage(), e);
        }
    }
}
