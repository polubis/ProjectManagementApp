import React, { useState } from 'react';

import { FormSubmitEvent } from 'shared/forms';
import { signInViaCredentials, signInViaGithub } from 'api/auth';
import Modal from 'shared/modal/Modal';

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

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  }
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
      <button onClick={() => setModal(!modal)}>toggle modal</button>
      <button onClick={signInViaGithub}>Log in via github account</button>
      <Modal handleClose={toggleModal} open={modal} size="large">
        modal content
        <p style={{padding: "20px"}}>test</p>
        <p style={{padding: "20px"}}>test</p>
        <p style={{padding: "20px"}}>test</p>
        <p style={{padding: "20px"}}>test</p>
        <p style={{padding: "20px"}}>test</p>
        <p style={{padding: "20px"}}>test</p>
        <p style={{padding: "20px"}}>test</p>
        <p style={{padding: "20px"}}>test</p>
        <p style={{padding: "20px"}}>test</p>
        <p style={{padding: "20px"}}>test</p>
        <p style={{padding: "20px"}}>test</p>

      </Modal>
    </React.Fragment>
  );
};

export default Login;
