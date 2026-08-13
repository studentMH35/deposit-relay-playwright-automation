import { Page, expect, Locator } from '@playwright/test';

export class DepositPage {
  readonly page: Page;

  private readonly passwordInput: Locator;
  private readonly letsGetStartedButton: Locator;
  private readonly gotItButton: Locator;
  private readonly applicationHeading: Locator;
  private readonly ownerReadyStatus: Locator;
  private readonly addProductToggle: Locator;
  private readonly productSelect: Locator;
  private readonly accountNicknameInput: Locator;
  private readonly expectedDepositInput: Locator;
  private readonly termsCheckbox: Locator;
  private readonly submitButton: Locator;
  private readonly confirmationText: Locator;


  constructor(page: Page) {
    this.page = page;

    this.passwordInput = page.getByRole('textbox', {
      name: 'Password',
    });

    this.letsGetStartedButton = page.getByRole('button', {
      name: "Let's Get Started",
    });

    this.gotItButton = page.getByRole('button', {
      name: 'Got it!',
    });

    this.applicationHeading = page.getByRole('heading', {
      name: 'Who will be on the accounts?',
    });

    this.ownerReadyStatus = page.locator('.MuiSvgIcon-root.MuiSvgIcon-colorSuccess > path');
 
    this.addProductToggle = page.getByRole('heading', { name: 'Add Product' });
    this.productSelect = page.locator("//h6[text()='Add Product']/following::button[1]");
    this.accountNicknameInput = page.getByRole('textbox', { name: 'Account Nickname' });
    this.expectedDepositInput = page.getByRole('textbox', { name: 'Initial Deposit' });
    this.termsCheckbox = page.locator('#terms');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.confirmationText = page.getByText(/Thank you for submitting the application/i);
 
  }

  async navigate(url: string) {
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    await expect(this.passwordInput).toBeVisible({
      timeout: 45_000,
    });
  }

  async enterCode(code: string) {
    await this.passwordInput.fill(code);
    await this.passwordInput.press('Enter');
  }

  async completeWelcome() {
    await expect(this.letsGetStartedButton).toBeVisible({
      timeout: 30_000,
    });

    await this.letsGetStartedButton.click();

    await expect(this.gotItButton).toBeVisible({
      timeout: 15_000,
    });

    await this.gotItButton.click();
  }

  async assertApplicationPage() {
    await expect(this.applicationHeading).toBeVisible({
      timeout: 30_000,
    });
  }

  async assertOwnerComplete() {
    await expect(this.ownerReadyStatus).toBeVisible({ timeout: 15_000 });
  }
 
  async addProduct(nickname: string, expectedDeposit: string) {
    await this.addProductToggle.click();
    await this.productSelect.click();
    await this.accountNicknameInput.fill(nickname);
    await this.expectedDepositInput.fill(expectedDeposit);
  }

  async acceptTermsAndSubmit() {
    await this.termsCheckbox.check();
    await expect(this.submitButton).toBeEnabled({ timeout: 10_000 });
    await this.submitButton.click();
  }
 
  async assertConfirmation() {
    await expect(this.confirmationText).toBeVisible({ timeout: 30_000 });
  }
}
