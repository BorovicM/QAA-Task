import { expect } from 'playwright/test';
export class CareerPage {
  constructor(page) {
    this.page = page;
  }

  //Locators
  positionSelector = () =>
    this.page.locator(
      'div:nth-child(5) > .list_item > .joblisting_text > .job_list_table > div:nth-child(2) > .jobsearch-job-userlist > .apply_btn'
    );
  applyNowButton = () => this.page.getByRole('link', { name: 'Apply now' }).first();
  roleTitle = () =>
    this.page.locator('form[name="profileForm"] div').filter({ hasText: 'Senior QA Engineer in' }).nth(4);
  CVField = () => this.page.getByText('Please upload your CV');
  uploadCV = () => this.page.locator('#cv');
  firstName = () => this.page.getByPlaceholder('First name');
  lastName = () => this.page.getByPlaceholder('Last name');
  phoneNumber = () => this.page.getByPlaceholder('1234567');
  email = () => this.page.locator('#email');
  city = () => this.page.locator('#locality');
  school = () => this.page.getByLabel('Elementary school High school');
  whereYouHearAboutPosition = () =>
    this.page.getByLabel('Company WebsiteEventFacebookInfostudInstagramJobertyLinkedInMeetupOpen');
  dataPrivacy = () => this.page.getByText('Data Privacy Statement', { exact: true });
  submitFormButton = () => this.page.getByRole('button', { name: 'Apply' });
  warningMessage = () => this.page.locator('section').getByText('Please check all mandatory');

  //Functions
  async goTo() {
    await this.page.goto('/');
  }

  async clickOnPositionWeWantToApply() {
    await this.positionSelector().click();
  }

  async clickOnApplyNowButton() {
    await this.applyNowButton().click();
  }

  async clickOnUploadCV() {
    const filePath = 'D:/Programiranje/CVTest.txt';
    await this.uploadCV().click();
    await this.uploadCV().setInputFiles(filePath);
  }

  async enterFirstName(firstName) {
    await this.firstName().fill(firstName);
  }

  async enterLastName(lastName) {
    await this.lastName().fill(lastName);
  }

  async enterPhoneNumber(phoneNumber) {
    await this.phoneNumber().fill(phoneNumber);
  }

  async enterEmail(email) {
    await this.email().fill(email);
  }

  async enterCity(city) {
    await this.city().fill(city);
  }

  async selectSchool(school) {
    await this.school().selectOption(school);
  }

  async selectWhereYouHearAboutPosition(position) {
    await this.whereYouHearAboutPosition().selectOption(position);
  }

  async agreeOnDataPrivacy() {
    await this.dataPrivacy().click();
  }

  async clickOnSubmitFormButton() {
    await this.submitFormButton().click();
  }

  //Assertion
  async assertRoleTitleIsVisible() {
    const roleTitle = this.roleTitle();
    await expect(roleTitle).toBeVisible();
    await expect(roleTitle).toHaveText('   Senior QA Engineer in Technology Consulting, EY   ');
  }

  async assertWarningMessageIsVisible() {
    const warningMessage = this.warningMessage();
    await expect(warningMessage).toBeVisible();
    await expect(warningMessage).toHaveText(' Please check all mandatory fields and try again.');
  }

  async assertFirstNameField(name) {
    const firstName = this.firstName();
    await expect(firstName).toBeVisible();
    await expect(firstName).toHaveAttribute('placeholder', 'First name');
    await expect(firstName).toHaveValue(name);
  }

  async assertLastNameField(lname) {
    const lastName = this.lastName();
    await expect(lastName).toBeVisible();
    await expect(lastName).toHaveAttribute('placeholder', 'Last name');
    await expect(lastName).toHaveValue(lname);
  }

  async assertPhoneNumberField() {
    const phoneNumber = this.phoneNumber();
    await expect(phoneNumber).toBeVisible();
    await expect(phoneNumber).toHaveAttribute('placeholder', '060 1234567');
  }

  async assertEmailField(mail) {
    const email = this.email();
    await expect(email).toBeVisible();
    await expect(email).toHaveAttribute('id', 'email');
    await expect(email).toHaveValue(mail);
  }

  async assertCityField(location) {
    const city = this.city();
    await expect(city).toBeVisible();
    await expect(city).toHaveAttribute('id', 'locality');
    await expect(city).toHaveValue(location);
  }

  async assertSchoolField(schoolValue) {
    const school = this.school();
    await expect(school).toBeVisible();
    await expect(school).toHaveText(
      `                        Elementary school High school Associate Degree Bachelor's degree Master's degree Advanced professional PhD degree `
    );
    await expect(school).toHaveValue(schoolValue);
  }

  async assertWhereYouHearAboutPositionField(aboutPosition) {
    const whereYouHearAboutPosition = this.whereYouHearAboutPosition();
    await expect(whereYouHearAboutPosition).toBeVisible();
    await expect(whereYouHearAboutPosition).toHaveText(
      'Company WebsiteEventFacebookInfostudInstagramJobertyLinkedInMeetupOpen DayOtherRecommendation'
    );
    await expect(whereYouHearAboutPosition).toHaveValue(aboutPosition);
  }

  async assertDataPrivacyField() {
    const dataPrivacy = this.dataPrivacy();
    await expect(dataPrivacy).toBeVisible();
    await expect(dataPrivacy).toHaveText('Data Privacy Statement', { exact: true });
  }

  async assertSubmitFormButton() {
    const submitFormButton = this.submitFormButton();
    await expect(submitFormButton).toBeVisible();
    await expect(submitFormButton).toHaveRole('button');
    await expect(submitFormButton).toHaveText('Apply');
  }

  async assertCVField() {
    const CVField = this.CVField();
    await expect(CVField).toBeVisible();
  }

  //Keywords

  async assertationForPositiveTest(formData) {
    await this.assertRoleTitleIsVisible();
    await this.assertCVField();
    await this.assertFirstNameField(formData.firstName);
    await this.assertLastNameField(formData.lastName);
    await this.assertPhoneNumberField();
    await this.assertEmailField(formData.email);
    await this.assertCityField(formData.city);
    await this.assertSchoolField(formData.school);
    await this.assertWhereYouHearAboutPositionField(formData.whereYouHearAboutPosition);
    await this.assertDataPrivacyField();
    await this.assertSubmitFormButton();
  }
  async assertationForNegativeTest(formData) {
    await this.assertRoleTitleIsVisible();
    await this.assertCVField();
    await this.assertPhoneNumberField();
    await this.assertEmailField(formData.email);
    await this.assertCityField(formData.city);
    await this.assertSchoolField(formData.school);
    await this.assertWhereYouHearAboutPositionField(formData.whereYouHearAboutPosition);
    await this.assertDataPrivacyField();
    await this.assertSubmitFormButton();
    await this.assertWarningMessageIsVisible();
  }

  async positiveTest(formData) {
    await this.goTo();
    await this.page.pause();
    await this.clickOnPositionWeWantToApply();
    await this.clickOnApplyNowButton();
    await this.clickOnUploadCV();
    await this.enterFirstName(formData.firstName);
    await this.enterLastName(formData.lastName);
    await this.phoneNumber(formData.phoneNumber);
    await this.enterEmail(formData.email);
    await this.enterCity(formData.city);
    await this.selectSchool(formData.school);
    await this.selectWhereYouHearAboutPosition(formData.whereYouHearAboutPosition);
    await this.agreeOnDataPrivacy();
  }

  async negativeTest(formData) {
    await this.goTo();
    await this.clickOnPositionWeWantToApply();
    await this.clickOnApplyNowButton();
    await this.clickOnUploadCV();
    await this.phoneNumber(formData.phoneNumber);
    await this.enterEmail(formData.email);
    await this.enterCity(formData.city);
    await this.selectSchool(formData.school);
    await this.selectWhereYouHearAboutPosition(formData.whereYouHearAboutPosition);
    await this.agreeOnDataPrivacy();
    await this.clickOnSubmitFormButton();
  }
}
