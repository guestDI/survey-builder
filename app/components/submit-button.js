import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SubmitButtonComponent extends Component {
  @action
  handleClick() {
    if (this.args.element.action === 'nextPage') {
      this.args.onNextPage();
    }
  }
}
