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

  @tracked pages = [
    {
      name: 'Overal Info',
      elements: [
        new PageElement('text', 'Department', 'name', true),
        new PageElement('text', 'Role', 'role', 'name', true),
        new PageElement('text', 'Age', 'age', 'age', true),
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
        new PageElement('text', 'Previous company', 'prevComp', true),
        new PageElement('text', 'Previous role', 'currRole', true),
      ],
    },
  ];

  @tracked currentPage = 0;

  get currentPageConfig() {
    return this.pages[this.currentPage];
  }

  @action
updateElementValue(element, eventOrValue) {
  // Если передается событие, это input или change, получаем значение
  const value = eventOrValue.target ? eventOrValue.target.value : eventOrValue;
  element.value = value;  // Устанавливаем новое значение
  // this.saveSurveyProgress();  // Сохраняем прогресс в localStorage
}

  get isNextDisabled() {
    // Проверяем, что все обязательные поля заполнены
    return this.currentPageConfig.elements.some(element => {
      if (element.required) {
        if (element.type === 'radio') {
          return !element.value;  // Если нет значения, возвращаем true (чтобы кнопка была disabled)
        } else {
          // Для текстовых полей проверяем пустые строки
          return !element.value || element.value.trim() === '';  // Пустое поле
        }
      }
      return false;  // Если поле не обязательное, оно не влияет на состояние кнопки
    });
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
