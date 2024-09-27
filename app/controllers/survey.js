import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

class PageElement {
  @tracked value = '';

  constructor(type, label, id, required = false, options = []) {
    this.type = type;
    this.label = label;
    this.id = id;
    this.required = required;
    this.options = options;
  }
}

export default class SurveyPageController extends Controller {
  @tracked currentStep = 1;
  @tracked currentPage = 0;
  totalSteps = this.pages.length;

  @tracked surveyName = "Satisfaction survey"

  @tracked pages = [
    {
      name: 'General Info',
      elements: [
        new PageElement('text', 'Department', 'department', true),
        new PageElement('text', 'Role', 'role', 'role', true),
        new PageElement('text', 'Age', 'age', 'age', true),
        new PageElement('text', 'Email', 'email', 'email', true),
        new PageElement('radio', 'Select your favorite color', 'favoriteColor', true, [
          { label: 'Red', value: 'red' },
          { label: 'Green', value: 'green' },
          { label: 'Blue', value: 'blue' }
        ])
      ],
    },
    {
      name: 'Work experience',
      elements: [
        new PageElement('text', 'Company', 'prevComp', true),
        new PageElement('text', 'Role', 'currRole', true),
        new PageElement('text', 'Role', 'currRole', true),
      ],
    },
    {
      name: 'Satisfaction',
      elements: [
        new PageElement('text', 'Overall satisfaction', 'statisfactionLevel', true),
        // new PageElement('text', 'Role', 'currRole', true),
        // new PageElement('text', 'Role', 'currRole', true),
      ],
    },
  ];

  @tracked currentPage = 0;

  get currentPageConfig() {
    return this.pages[this.currentPage];
  }

  get surveyTitle() {
    return this.surveyName;
  }

  @action
updateElementValue(element, eventOrValue) {
  // Если передается событие, это input или change, получаем значение
  const value = eventOrValue.target ? eventOrValue.target.value : eventOrValue;
  element.value = value; 
  // this.saveSurveyProgress();  // Сохраняем прогресс в localStorage
}

  get isNextDisabled() {
    return this.currentPageConfig.elements.some(element => {
      if (element.required) {
        if (element.type === 'radio') {
          return !element.value;  
        } else {
          return !element.value || element.value.trim() === '';  
        }
      }
      return false;  
    });
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
      alert('Survey completed!');
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
