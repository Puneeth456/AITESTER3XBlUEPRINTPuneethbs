package com.salesforce.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.BeforeMethod;

import java.time.Duration;

public class BaseTest {

    protected WebDriver driver;

    protected static final String LOGIN_URL = "https://login.salesforce.com/?locale=in";

    protected static final String VALID_USERNAME = "REPLACE_WITH_VALID_SF_EMAIL";
    protected static final String VALID_PASSWORD = "REPLACE_WITH_VALID_SF_PASSWORD";
    protected static final String INVALID_USERNAME = "invalid.user@notexist.com";
    protected static final String INVALID_PASSWORD = "WrongPassword@999";

    @BeforeSuite
    public void setUp() {
        try {
            WebDriverManager.chromedriver().setup();
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--start-maximized");
            options.addArguments("--disable-notifications");
            options.addArguments("--disable-popup-blocking");
            driver = new ChromeDriver(options);
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
            driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
        } catch (Exception e) {
            throw new RuntimeException("WebDriver initialization failed: " + e.getMessage(), e);
        }
    }

    @BeforeMethod
    public void navigateToLogin() {
        try {
            driver.get(LOGIN_URL);
        } catch (Exception e) {
            throw new RuntimeException("Failed to navigate to Salesforce login page: " + e.getMessage(), e);
        }
    }

    @AfterSuite
    public void tearDown() {
        try {
            if (driver != null) {
                driver.quit();
            }
        } catch (Exception e) {
            throw new RuntimeException("WebDriver quit failed: " + e.getMessage(), e);
        }
    }
}
