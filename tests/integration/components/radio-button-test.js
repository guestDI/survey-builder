import { module, test } from 'qunit';
import { setupRenderingTest } from 'survey-builder/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | radio-button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<RadioButton />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <RadioButton>
        template block text
      </RadioButton>
    `);

    assert.dom().hasText('template block text');
  });
});
