import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class CheckboxComponent extends Component {
  @action
  toggleCheckbox(event) {
    const isChecked = event.target.checked;
    if (this.args.updateValue) {
      this.args.updateValue(isChecked);
    }
  }
}
