import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class StepBarComponent extends Component {
  @tracked currentStep = 1;
  @tracked totalSteps = 5;

  get progress() {
    return (this.currentStep / this.totalSteps) * 100;
  }
}
