import { module, test } from 'qunit';
import { setupTest } from 'survey-builder/tests/helpers';

module('Unit | Service | form-validator', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:form-validator');
    assert.ok(service);
  });
});
