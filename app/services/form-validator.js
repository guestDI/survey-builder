// app/services/form-validator.js

import Service from '@ember/service';

export default class FormValidatorService extends Service {
  validationRules = {
    name: {
      required: true,
      minLength: 3,
      message: 'Name must be at least 3 characters long',
    },
    age: {
      required: true,
      min: 18,
      message: 'Age must be 18 or older',
    },
  };

  createProxy(formData) {
    const validationRules = this.validationRules;

    return new Proxy(formData, {
      set(target, prop, value) {
        const rules = validationRules[prop];

        if (rules) {
          if (rules.required && (value === '' || value === null)) {
            console.error(`${prop} is required`);
            return false;
          }

          if (rules.minLength && value.length < rules.minLength) {
            console.error(rules.message);
            return false;
          }

          if (rules.min && value < rules.min) {
            console.error(rules.message);
            return false;
          }
        }

        target[prop] = value;
        return true;
      },
    });
  }
}
