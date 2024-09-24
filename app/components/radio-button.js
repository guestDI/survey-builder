import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RadioButtonComponent extends Component {
    @action
    updateSelection(event) {
      // Проверим, что event и event.target существуют
      if (event && event.target) {
        const selectedValue = event.target.value;  // Получаем значение из event
        this.args.updateValue(selectedValue);      // Передаём выбранное значение
      } else {
        console.error('Event or event.target is undefined');
      }
    }
}
