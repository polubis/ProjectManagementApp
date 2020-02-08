import React, { useState } from 'react';

import { FormSubmitEvent } from 'shared/forms';
import { signInViaCredentials, signInViaGithub } from 'api/auth';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInViaCredentials = (e: FormSubmitEvent) => {
    e.preventDefault();

    signInViaCredentials({ login, password })
      .then(res => {
        alert('You are logged in!');
      })
      .catch(error => {
        console.log(error);
        alert('Invalid authorization credentials');
      });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSignInViaCredentials}>
        <input
          placeholder="login"
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Log in via credentials</button>
      </form>

      <button onClick={signInViaGithub}>Log in via github account</button>
    </React.Fragment>
  );
};

export default Login;
