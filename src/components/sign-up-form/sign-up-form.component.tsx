import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCurrentUser, type CurrentUserType } from '../../store/user/user.slice';

import { AuthErrorCodes, type AuthError } from 'firebase/auth';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  updateUserProfile,
} from '../../utils/firebase/firebase.utility';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import Spinner from '../spinner/spinner.component';
import Modal, { ModalIconTypes, type ModalTextType } from '../modal/modal.component';

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
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState<ModalTextType | undefined>(undefined);
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { displayName, email, password, confirmPassword } = formFields;

  function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  function resetFromFields() {
    setFormFields(defaultFromFields);
  }

  async function submitSignUpFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!displayName || !email) return;

    if (password !== confirmPassword) {
      setModalText({
        header: 'Sign Up Error',
        message: 'Passwords do not match.',
      });
      setIsModalOpen(true);
      return;
    }
    setIsLoadingUser(true);

    try {
      await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth({ displayName });
      const user = await updateUserProfile(displayName);
      const selectedUserDetails = user && (({ displayName, email }) => ({ displayName, email }))(user);
      dispatch(setCurrentUser(selectedUserDetails as CurrentUserType));

      resetFromFields();
      navigate('/');
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.WEAK_PASSWORD) {
        setModalText({
          header: 'Sign Up Error',
          message: `Error code: ${AuthErrorCodes.WEAK_PASSWORD}. Your password should consist of at least 6 characters.`,
        });
        setIsModalOpen(true);
      } else {
        setModalText({
          header: 'Sign Up Error',
          message: 'Error signing up. Please try again.',
        });
        setIsModalOpen(true);
      }
    }

    setIsLoadingUser(false);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="sign-up-container">
      <h2>Dont have an account?</h2>
      <span>Sign up with your email and password</span>
      <form
        onSubmit={submitSignUpFormHandler}
        autoComplete="on">
        <FormInput
          labelOptions={{
            label: 'Display Name',
            htmlFor: 'sign-up-displayName',
          }}
          inputOptions={{
            required: true,
            type: 'text',
            name: 'displayName',
            id: 'sign-up-displayName',
            value: displayName,
            onChange: inputChangeHandler,
          }}
        />
        <FormInput
          labelOptions={{
            label: 'Email',
            htmlFor: 'sign-up-email',
          }}
          inputOptions={{
            required: true,
            type: 'email',
            name: 'email',
            id: 'sign-up-email',
            value: email,
            onChange: inputChangeHandler,
          }}
        />
        <FormInput
          labelOptions={{
            label: 'Password',
            htmlFor: 'sign-up-password',
          }}
          inputOptions={{
            required: true,
            type: 'password',
            name: 'password',
            id: 'sign-up-password',
            value: password,
            onChange: inputChangeHandler,
          }}
        />
        <FormInput
          labelOptions={{
            label: 'Confirm Password',
            htmlFor: 'sign-up-confirmPassword',
          }}
          inputOptions={{
            required: true,
            type: 'password',
            name: 'confirmPassword',
            id: 'sign-up-confirmPassword',
            value: confirmPassword,
            onChange: inputChangeHandler,
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
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          modalHeader={modalText?.header}
          modalMessage={modalText?.message}
          modalIconType={ModalIconTypes.Alert}>
          <Button onClick={closeModal}>Close</Button>
        </Modal>
      )}
    </div>
  );
}

export default SignUpForm;
