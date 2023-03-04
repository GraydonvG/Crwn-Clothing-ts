import { useState } from 'react';
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../Utilities/firebase/firebase.utility';

import FormInput from '../FormInput/FormInput.component';
import Button from '../Button/Button.component';

import './SignInForm.styles.scss';

const defaultFromFields = {
  email: '',
  password: '',
};

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { email, password } = formFields;

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  function resetFromFields() {
    setFormFields(defaultFromFields);
  }

  async function handleSubmitSignInForm(event) {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFromFields();
    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        alert('Unable to sign in. Incorrect email or password.');
      } else {
        console.log('error signing in', error);
      }
    }
  }

  async function signInWithGoogle() {
    await signInWithGooglePopup();
  }

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
          <Button type="submit">SIGN IN</Button>
          <Button
            type="button"
            buttonType={'google'}
            onClick={signInWithGoogle}>
            SIGN IN WITH GOOGLE
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
