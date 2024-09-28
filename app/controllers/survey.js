import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

class PageElement {
  @tracked value = '';

  constructor({ type, label, id, options = [], validationRules = {} }) {
    this.type = type;
    this.label = label;
    this.id = id;
    this.options = options;
    this.validationRules = validationRules;
  }
}

export default class SurveyPageController extends Controller {
  @tracked currentPage = 0;
  totalSteps = this.pages.length;
  @service router;
  @service formValidator;

  @tracked surveyName = 'Satisfaction survey';

  @tracked pages = [
    {
      name: 'General Info',
      elements: [
        new PageElement({
          type: 'text',
          label: 'Department',
          id: 'department',
          validationRules: { required: true, minLength: 5 },
        }),
        new PageElement({
          type: 'text',
          label: 'Role',
          id: 'role',
          validationRules: { required: true, minLength: 4 },
        }),
        new PageElement({
          type: 'text',
          label: 'Age',
          id: 'age',
          validationRules: { required: true, minLength: 2 },
        }),
        new PageElement({
          type: 'text',
          label: 'Email',
          id: 'email',
          validationRules: { required: true, minLength: 2 },
        }),
        new PageElement({
          type: 'radio',
          label: 'Select your favorite color',
          id: 'favoriteColor',
          options: [
            { label: 'Red', value: 'red' },
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
            { value: 'other', label: 'Other' },
          ],
          validationRules: { required: true, minLength: 2 },
        }),
      ],
    },
    {
      name: 'Work experience',
      elements: [
        new PageElement({
          type: 'text',
          label: 'Company',
          id: 'prevComp',
          validationRules: { required: true, minLength: 2 },
        }),
        new PageElement({
          type: 'text',
          label: 'Role',
          id: 'prevRole',
          validationRules: { required: true, minLength: 2 },
        }),
        new PageElement({
          type: 'text',
          label: 'Title',
          id: 'title',
          validationRules: { required: true, minLength: 2 },
        }),
      ],
    },
    {
      name: 'Satisfaction',
      elements: [
        new PageElement({
          type: 'text',
          label: 'Overall satisfaction',
          id: 'statisfactionLevel',
          validationRules: { required: true, minLength: 2 },
        }),
        new PageElement({
          type: 'text',
          label: 'Project satisfaction',
          id: 'projectSatisfaction',
          validationRules: { required: true, minLength: 2 },
        }),
        new PageElement({
          type: 'checkbox',
          label: 'Select your future plans',
          id: 'plans',
          options: [
            { label: 'Technologies', checked: false },
            { label: 'People', checked: false },
            { label: 'Other', checked: false },
          ],
          validationRules: { required: true },
        }),
      ],
    },
  ];

  get currentPageConfig() {
    return this.pages[this.currentPage];
  }

  get surveyTitle() {
    return this.surveyName;
  }

  @action
  updateElementValue(element, eventOrValue) {
    const value = eventOrValue.target
      ? eventOrValue.target.value
      : eventOrValue;
    element.value = value;
    localStorage.setItem('survey-progress', JSON.stringify(this.pages));
  }

  validatePage() {
    return this.currentPageConfig.elements.every((element) => {
      if (element.required) {
        if (!element.value || element.value.trim() === '') {
          return false;
        }

        const { validationRules } = element;
        if (validationRules) {
          if (
            validationRules.minLength &&
            element.value.length < validationRules.minLength
          ) {
            return false;
          }
          if (validationRules.min && element.value < validationRules.min) {
            return false;
          }
        }
      }
      return true;
    });
  }

  get isNextDisabled() {
    return !this.validatePage();
  }

  get btnTitle() {
    return this.currentPage === this.pages.length - 1 ? 'Submit' : 'Proceed';
  }

  get isBackEnabled() {
    return this.currentPage > 0;
  }

  @action
  handleNextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
      this.currentStep++;
    } else {
      this.router.transitionTo('completion');
    }
  }

  @action
  handleBackPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.currentStep--;
    }
  }
}
