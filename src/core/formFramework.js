export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: ''
  }
}

export function validateControl(value, validParams) {
  if (!validParams) {
    return true;
  }
  const email = /^([a-z0-9_-]+\.)*[a-z0-9_+0-9-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  let isValid = true;

  if (validParams.required) {
    isValid = `${value}`.trim() !== '' && isValid;
  }

  if (validParams.email) {
    isValid = email.test(value);
  }

  if (validParams.minLength) {
    isValid = `${value}`.trim().length > validParams.minLength
  }
  return isValid;
}

export function validateForm(formControls, isFormValid = true) {
  Object.keys(formControls).forEach((key) => {
    isFormValid = formControls[key].valid && isFormValid;
  });
  return isFormValid;
}