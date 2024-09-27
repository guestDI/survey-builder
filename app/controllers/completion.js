import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CompletionController extends Controller {
  @service router;

  @action
  startNewSurvey() {
    localStorage.removeItem('surveyProgress');
    this.router.transitionTo('survey');
  }

  @action
  goHome() {
    this.router.transitionTo('introduction');
  }
}
