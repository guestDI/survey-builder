import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RadioButtonComponent extends Component {
    @tracked showOtherInput = false;

  @action
  updateSelection(event) {
    const selectedValue = event.target.value;

    if (selectedValue === 'other') {
      this.showOtherInput = true; // Показываем текстовое поле
    } else {
      this.showOtherInput = false; // Скрываем текстовое поле
    }

    if (this.args.updateValue) {
      this.args.updateValue(selectedValue); // Обновляем выбранное значение
    }
  }

  @action
  updateOtherValue(event) {
    const otherValue = event.target.value;
    if (this.args.updateValue) {
      this.args.updateValue(otherValue); // Передаем значение "Other"
    }
  }
}
