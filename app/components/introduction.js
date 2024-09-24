import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IntroductionComponent extends Component {
  @tracked name = '';
  @service router;

  @action
  updateName(event) {
    this.name = event.target.value;
  }

  @action
  proceed() {
    if (this.name) {
      this.router.transitionTo('survey');
    }
  }
}
