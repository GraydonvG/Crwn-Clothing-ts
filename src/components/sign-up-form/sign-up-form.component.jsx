import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoadingUser } from '../../store/user/user.selector';
import { setIsLoadingUser } from '../../store/user/user.slice';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  updateUserProfileDisplayName,
} from '../../utils/firebase/firebase.utility';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import Spinner from '../spinner/spinner.component';

import './sign-up-form.styles.scss';
import { useNavigate } from 'react-router-dom';

const defaultFromFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoadingUser = useSelector(selectIsLoadingUser);
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { displayName, email, password, confirmPassword } = formFields;

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  function resetFromFields() {
    setFormFields(defaultFromFields);
  }

  async function handleSubmitSignUpForm(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    dispatch(setIsLoadingUser(true));

    try {
      // throw new Error('random error');
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await updateUserProfileDisplayName(user, displayName);
      await createUserDocumentFromAuth(user, { displayName });
      resetFromFields();
      navigate('/');
      window.location.reload();
    } catch (error) {
      dispatch(setIsLoadingUser(false));
      if (error.code === 'auth/email-already-in-use') {
        alert('Error creating user account');
        // make error masseage
        // make spinner for signin
      } else {
        alert(error);
      }
    }

    dispatch(setIsLoadingUser(false));
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
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
