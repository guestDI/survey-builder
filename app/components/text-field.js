import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class TextFieldComponent extends Component {
  @action
  updateValue(event) {
    this.args.element.value = event.target.value;
  }
}
