import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SurveyPageController extends Controller {
  @tracked name = ''; // Отслеживаемое значение имени

  @tracked currentStep = 1;
  totalSteps = 5;

  @tracked pages = [
    {
      name: 'Introduction',
      elements: [
        { type: 'text', label: 'Enter your name', id: 'name', value: '' }
      ]
    },
    {
      name: 'Contact Information',
      elements: [
        { type: 'email', label: 'Enter your email', id: 'email', value: '' }
      ]
    }
  ];

  @tracked currentPage = 0;

  get currentPageConfig() {
    return this.pages[this.currentPage];
  }

  // Проверка, что имя введено, чтобы активировать кнопку "Proceed"
  get isNextEnabled() {
    return this.name.trim() !== '';
  }

  // Обработчик для перехода на следующую страницу
  @action
  handleNextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
      this.currentStep++;
    } else {
      alert('Survey completed!');
    }
  }

  // Обработчик обновления значения поля имени
  @action
  updateName(event) {
    this.name = event.target.value;
  }
}
