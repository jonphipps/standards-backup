import { test, expect, Page } from '@playwright/test';

const PAGE_URL = 'http://localhost:3001/ISBDM/docs/examples/sensory-test-vocabulary/';

test.describe('Sensory Test Vocabulary Page - E2E Tests', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto(PAGE_URL);
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  test.describe('Page Loading and Structure', () => {
    test('should load the page successfully', async () => {
      await expect(page).toHaveTitle(/Sensory Specification Test Vocabulary/);
      
      // Check that the main heading is present
      await expect(page.locator('h1')).toContainText('Sensory Specification Test Vocabulary');
    });

    test('should display all three VocabularyTable components', async () => {
      // Check for the three main vocabulary tables
      await expect(page.locator('text=Sensory Specification Vocabulary (Test Data)')).toBeVisible();
      await expect(page.locator('text=Sensory Terms (Custom Display)')).toBeVisible();
      await expect(page.locator('text=Sensory Terms Glossary')).toBeVisible();
    });

    test('should show CSV data loading and display vocabulary terms', async () => {
      // Wait for vocabulary data to load
      await page.waitForSelector('text=aural', { timeout: 10000 });
      
      // Check that key vocabulary terms are visible
      await expect(page.locator('text=aural')).toBeVisible();
      await expect(page.locator('text=gustatory')).toBeVisible();
      await expect(page.locator('text=tactile')).toBeVisible();
    });
  });

  test.describe('Search and Filter Functionality', () => {
    test('should filter vocabulary terms using search input', async () => {
      // Wait for data to load first
      await page.waitForSelector('text=aural', { timeout: 10000 });
      
      // Find the first search input (there are multiple on the page)
      const searchInput = page.locator('input[placeholder*="Filter"]').first();
      await searchInput.fill('aural');
      
      // Check that only aural terms are visible in that section
      const firstTable = page.locator('.vocabularyContainer').first();
      await expect(firstTable.locator('text=aural')).toBeVisible();
      
      // Clear search
      await searchInput.clear();
      await page.waitForTimeout(500); // Wait for filter to clear
      
      // Check that all terms are visible again
      await expect(page.locator('text=gustatory').first()).toBeVisible();
    });

    test('should show no results message for non-existent terms', async () => {
      // Wait for data to load
      await page.waitForSelector('text=aural', { timeout: 10000 });
      
      const searchInput = page.locator('input[placeholder*="Filter"]').first();
      await searchInput.fill('nonexistentterm12345');
      
      // Should show no results message
      await expect(page.locator('text=No matching terms found')).toBeVisible();
    });
  });

  test.describe('Language Switching', () => {
    test('should switch between different languages', async () => {
      // Wait for data to load
      await page.waitForSelector('text=aural', { timeout: 10000 });
      
      // Check English is default
      await expect(page.locator('text=aural').first()).toBeVisible();
      
      // Look for language selector tabs in the first vocabulary table
      const languageSelector = page.locator('.vocabularyContainer').first();
      
      // Try to click French tab if it exists
      const frenchTab = languageSelector.locator('button:has-text("FR"), button:has-text("Français"), [role="tab"]:has-text("fr")');
      if (await frenchTab.count() > 0) {
        await frenchTab.first().click();
        await page.waitForTimeout(1000);
        
        // Check that French terms are displayed
        await expect(page.locator('text=auditif')).toBeVisible();
      }
      
      // Try Spanish tab if it exists
      const spanishTab = languageSelector.locator('button:has-text("ES"), button:has-text("Español"), [role="tab"]:has-text("es")');
      if (await spanishTab.count() > 0) {
        await spanishTab.first().click();
        await page.waitForTimeout(1000);
        
        // Check that Spanish terms are displayed
        await expect(page.locator('text=auditiva')).toBeVisible();
      }
    });

    test('should display different content for different vocabulary configurations', async () => {
      // Wait for all tables to load
      await page.waitForSelector('text=aural', { timeout: 10000 });
      
      // Check that the custom display table shows French by default
      const customTable = page.locator('text=Sensory Terms (Custom Display)').locator('..').locator('..');
      await expect(customTable.locator('text=auditif')).toBeVisible();
      
      // Check that the glossary table shows English without language selector
      const glossaryTable = page.locator('text=Sensory Terms Glossary').locator('..').locator('..');
      await expect(glossaryTable.locator('text=aural')).toBeVisible();
    });
  });

  test.describe('Vocabulary Content and Definitions', () => {
    test('should display definitions for vocabulary terms', async () => {
      // Wait for data to load
      await page.waitForSelector('text=aural', { timeout: 10000 });
      
      // Check that definitions are visible
      await expect(page.locator('text=Content that is intended to be perceived through hearing')).toBeVisible();
      await expect(page.locator('text=Content that is intended to be perceived through taste')).toBeVisible();
      await expect(page.locator('text=Content that is intended to be perceived through touch')).toBeVisible();
    });

    test('should show examples for vocabulary terms', async () => {
      // Wait for data to load
      await page.waitForSelector('text=aural', { timeout: 10000 });
      
      // Look for example content
      await expect(page.locator('text=Audiobooks, music recordings')).toBeVisible();
      await expect(page.locator('text=Wine tasting notes')).toBeVisible();
      await expect(page.locator('text=Braille books')).toBeVisible();
    });

    test('should display vocabulary URIs when enabled', async () => {
      // Wait for data to load
      await page.waitForSelector('text=aural', { timeout: 10000 });
      
      // The first table should show URIs, check for sensoryspec prefix
      await expect(page.locator('text=sensoryspec:T1001')).toBeVisible();
    });
  });

  test.describe('Accessibility Features', () => {
    test('should have proper heading structure', async () => {
      // Check main heading
      const h1 = page.locator('h1');
      await expect(h1).toContainText('Sensory Specification Test Vocabulary');
      
      // Check subheadings
      await expect(page.locator('h2:has-text("Basic Example")')).toBeVisible();
      await expect(page.locator('h2:has-text("Example with Custom Settings")')).toBeVisible();
      await expect(page.locator('h2:has-text("Example for Glossary Use")')).toBeVisible();
    });

    test('should have accessible form inputs', async () => {
      // Wait for inputs to load
      await page.waitForSelector('input[placeholder*="Filter"]', { timeout: 10000 });
      
      // Check that search inputs have proper labels or aria-labels
      const searchInputs = page.locator('input[placeholder*="Filter"]');
      const count = await searchInputs.count();
      
      for (let i = 0; i < count; i++) {
        const input = searchInputs.nth(i);
        const ariaLabel = await input.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
      }
    });

    test('should support keyboard navigation', async () => {
      // Wait for page to load
      await page.waitForSelector('input[placeholder*="Filter"]', { timeout: 10000 });
      
      // Tab to first search input
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      
      // Check that we can focus on interactive elements
      await expect(focusedElement).toBeVisible();
      
      // Type in the search box using keyboard
      await page.keyboard.type('aural');
      await page.waitForTimeout(500);
      
      // Should filter results
      await expect(page.locator('text=gustatory').first()).not.toBeVisible();
    });
  });

  test.describe('Performance and Loading', () => {
    test('should load CSV data within reasonable time', async () => {
      const startTime = Date.now();
      
      // Wait for vocabulary data to appear
      await page.waitForSelector('text=aural', { timeout: 10000 });
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
    });

    test('should handle multiple simultaneous filters', async () => {
      // Wait for data to load
      await page.waitForSelector('text=aural', { timeout: 10000 });
      
      // Get all search inputs
      const searchInputs = page.locator('input[placeholder*="Filter"]');
      const inputCount = await searchInputs.count();
      
      // Apply the same filter to multiple inputs
      for (let i = 0; i < Math.min(inputCount, 3); i++) {
        await searchInputs.nth(i).fill('aural');
      }
      
      // Wait for filters to process
      await page.waitForTimeout(1000);
      
      // Should still show aural terms
      await expect(page.locator('text=aural').first()).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async () => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Wait for data to load
      await page.waitForSelector('text=aural', { timeout: 10000 });
      
      // Check that content is still accessible
      await expect(page.locator('text=Sensory Specification Test Vocabulary')).toBeVisible();
      await expect(page.locator('text=aural').first()).toBeVisible();
      
      // Check that search functionality still works
      const searchInput = page.locator('input[placeholder*="Filter"]').first();
      await searchInput.fill('gustatory');
      await expect(page.locator('text=gustatory').first()).toBeVisible();
    });

    test('should work on tablet viewport', async () => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Wait for data to load
      await page.waitForSelector('text=aural', { timeout: 10000 });
      
      // Check that all vocabulary tables are visible
      await expect(page.locator('text=Sensory Specification Vocabulary (Test Data)')).toBeVisible();
      await expect(page.locator('text=Sensory Terms (Custom Display)')).toBeVisible();
      await expect(page.locator('text=Sensory Terms Glossary')).toBeVisible();
    });
  });
});