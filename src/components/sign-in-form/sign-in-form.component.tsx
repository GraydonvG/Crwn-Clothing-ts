import { useState, Fragment, type ChangeEvent, type FormEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utility';

import FormInput from '../form-input/form-input.component';
import Button, { ButtonType } from '../button/button.component';
import Spinner from '../spinner/spinner.component';

import './sign-in-form.styles.scss';

const defaultFromFields = {
  email: '',
  password: '',
};

function SignInForm() {
  const navigate = useNavigate();
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { email, password } = formFields;

  function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setErrorMessage(null);

    setFormFields({ ...formFields, [name]: value });
  }

  function resetFromFields() {
    setFormFields(defaultFromFields);
  }

  async function submitSignInFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
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
      console.log(error);
      if (error) {
        setErrorMessage('Error signing in. Please try again.');
      }
    }
    setIsLoadingUser(false);
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitSignInFormHandler}>
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
            onChange: inputChangeHandler,
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
            onChange: inputChangeHandler,
          }}
        />
        <div className="sign-in-buttons-container">
          {isLoadingUser ? (
            <Spinner />
          ) : (
            <Fragment>
              <Button
                disabled={isLoadingUser}
                type="submit">
                Sign in
              </Button>
              <Button
                disabled={isLoadingUser}
                type="button"
                buttonType={ButtonType.Google}
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
