import React, { ChangeEvent } from 'react';

import useForm from 'libs/forms';
import { RegisterFormKeys, registerFormConfig } from './registerFormConfig';

import classes from './RegisterPage.scss';

const RegisterPage = () => {
  const [fields, areFieldsInvalid, handleChange, handleSubmit] = useForm<
    RegisterFormKeys
  >(registerFormConfig);

  const handleRegister = (event: ChangeEvent<HTMLFormElement>) => {
    if (handleSubmit(event)) {
    }
  };

  return (
    <div className={classes.registerPage}>
      <form onSubmit={handleRegister}>
        <input
          data-field-key="email"
          value={fields.email.value}
          onChange={handleChange}
        />
        {fields.email.errors.map((error, idx) => (
          <p key={idx} style={{ color: error.valid ? 'green' : 'red' }}>
            {error.text}
          </p>
        ))}

        {fields.email.valid || <span>Fields invalid</span>}

        <input
          data-field-key="username"
          value={fields.username.value}
          onChange={handleChange}
        />
        {fields.username.errors.map((error, idx) => (
          <p key={idx} style={{ color: error.valid ? 'green' : 'red' }}>
            {error.text}
          </p>
        ))}

        <button className={classes.btn} disabled={areFieldsInvalid}>
          submit
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
