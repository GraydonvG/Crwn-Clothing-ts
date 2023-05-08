import { useState, useEffect, Fragment } from 'react';

import { useNavigate } from 'react-router-dom';

import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utility';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import Spinner from '../spinner/spinner.component';

import './sign-in-form.styles.scss';

const defaultFromFields = {
  email: '',
  password: '',
};

function SignInForm() {
  const navigate = useNavigate();
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { email, password } = formFields;

  function handleInputChange(event) {
    const { name, value } = event.target;

    setErrorMessage(null);

    setFormFields({ ...formFields, [name]: value });
  }

  function resetFromFields() {
    setFormFields(defaultFromFields);
  }

  async function handleSubmitSignInForm(event) {
    event.preventDefault();

    setIsLoadingUser(true);

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFromFields();
      navigate('/');
    } catch (error) {
      setErrorMessage('Error signing in. Please try again.');
    }

    setIsLoadingUser(false);
  }

  async function handleSignInWithGoogle() {
    setErrorMessage(null);
    setIsLoadingUser(true);
    try {
      await signInWithGooglePopup();
      navigate('/');
    } catch (error) {
      setErrorMessage('Error signing in. Please try again.');
    }
    setIsLoadingUser(false);
  }

  useEffect(() => {
    if (errorMessage || isLoadingUser) {
      setButtonIsDisabled(true);
    } else {
      setButtonIsDisabled(false);
    }
  }, [errorMessage, isLoadingUser]);

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmitSignInForm}>
        <FormInput
          labelOptions={{
            label: 'Email',
            htmlFor: 'email',
          }}
          inputOptions={{
            required: true,
            type: 'email',
            name: 'email',
            value: email,
            onChange: handleInputChange,
          }}
        />
        <FormInput
          labelOptions={{
            label: 'Password',
            htmlFor: 'password',
          }}
          inputOptions={{
            required: true,
            type: 'password',
            name: 'password',
            value: password,
            onChange: handleInputChange,
          }}
        />
        <div className="sign-in-buttons-container">
          {isLoadingUser ? (
            <Spinner />
          ) : (
            <Fragment>
              <Button
                disabled={buttonIsDisabled}
                type="submit">
                Sign in
              </Button>
              <Button
                disabled={buttonIsDisabled}
                type="button"
                buttonType={'google'}
                onClick={handleSignInWithGoogle}>
                Sign in with google
              </Button>
            </Fragment>
          )}
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default SignInForm;
