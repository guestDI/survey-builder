import { module, test } from 'qunit';
import { setupTest } from 'survey-builder/tests/helpers';

module('Unit | Route | survey', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:survey');
    assert.ok(route);
  });
});
