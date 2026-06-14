package com.salesforce.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class HomePage {

    private final WebDriver driver;
    private final WebDriverWait wait;

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        PageFactory.initElements(driver, this);
    }

    public boolean isHomePageLoaded() {
        try {
            wait.until(ExpectedConditions.urlContains("salesforce.com"));
            wait.until(ExpectedConditions.not(ExpectedConditions.urlContains("login.salesforce.com")));
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Home page did not load after login — URL check failed: " + e.getMessage(), e);
        }
    }

    public String getCurrentUrl() {
        try {
            return driver.getCurrentUrl();
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve current URL: " + e.getMessage(), e);
        }
    }

    public String getPageTitle() {
        try {
            return driver.getTitle();
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve page title: " + e.getMessage(), e);
        }
    }
}
