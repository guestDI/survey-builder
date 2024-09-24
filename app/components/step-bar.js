import Component from '@glimmer/component';

export default class StepBarComponent extends Component {
  get progress() {
    return (this.args.currentStep / this.args.totalSteps) * 100;
  }
}
