import { helper } from '@ember/component/helper';

export default helper(function lookupComponent([type]) {
  switch (type) {
    case 'text':
      return 'text-field';
    case 'email':
      return 'email-field';
    case 'button':
      return 'submit-button';
    default:
      return 'default-component';
  }
});
