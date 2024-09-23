import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IntroductionComponent extends Component {
    @tracked name = '';

    @action
    updateName(event) {
        this.name = event.target.value; // Обновляем имя при вводе
    }

  @action
  proceed() {
    if (this.name) {
      alert(`Proceeding as ${this.name}`);
      // Логика перехода к следующему шагу
    }
  }
}
