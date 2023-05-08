import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserDidUpdateProfile } from '../../store/user/user.selector';
import { setUserDidUpdateProfile } from '../../store/user/user.slice';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  updateUserProfile,
} from '../../utils/firebase/firebase.utility';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import Spinner from '../spinner/spinner.component';

import './sign-up-form.styles.scss';

const defaultFromFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDidUpdateProfile = useSelector(selectUserDidUpdateProfile);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { displayName, email, password, confirmPassword } = formFields;

  function handleInputChange(event) {
    const { name, value } = event.target;

    setErrorMessage(null);

    setFormFields({ ...formFields, [name]: value });
  }

  function resetFromFields() {
    setFormFields(defaultFromFields);
  }

  async function handleSubmitSignUpForm(event) {
    event.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setIsLoadingUser(true);

    try {
      //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

      // Unable to set displayName with createAuthUserWithEmailAndPassword
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // The user auth is returned and, as a result of the onAuthStateChanged observer, the currentUser state is updated ***BEFORE*** displayName is updated in the user's profile.
      // Therefore, displayName in the currentUser state is null.
      // Set displayName in the user auth by updating the user's profile.
      await updateUserProfile(user, displayName);

      // The users displayName and email come from the user auth and ***NOT*** the user document.
      await createUserDocumentFromAuth(user, { displayName });

      // The dispatch below triggers the useEffect in App.jsx to update the currentUser state after the user's profile is updated. This triggers a rerender which allows the user's displayName to appear in the nav-bar's welcome message.
      dispatch(setUserDidUpdateProfile(!userDidUpdateProfile));
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      resetFromFields();
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        setErrorMessage('Error signing up. Error code: auth/weak-password.');
      } else {
        setErrorMessage('Error signing up. Please try again.');
      }
    }

    setIsLoadingUser(false);
  }

  return (
    <div className="sign-up-container">
      <h2>Dont have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmitSignUpForm}>
        <FormInput
          labelOptions={{
            label: 'Display Name',
            htmlFor: 'displayName',
          }}
          inputOptions={{
            required: true,
            type: 'text',
            name: 'displayName',
            value: displayName,
            onChange: handleInputChange,
          }}
        />
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
        <FormInput
          labelOptions={{
            label: 'Confirm Password',
            htmlFor: 'confirmPassword',
          }}
          inputOptions={{
            required: true,
            type: 'password',
            name: 'confirmPassword',
            value: confirmPassword,
            onChange: handleInputChange,
          }}
        />
        <div className="sign-up-button-container">
          {isLoadingUser ? (
            <Spinner />
          ) : (
            <Button
              disabled={isLoadingUser}
              type="submit">
              Sign up
            </Button>
          )}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
