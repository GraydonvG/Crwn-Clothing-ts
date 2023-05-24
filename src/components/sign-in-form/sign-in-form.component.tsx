import { useState, Fragment, type ChangeEvent, type FormEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utility';

import FormInput from '../form-input/form-input.component';
import Button, { ButtonType } from '../button/button.component';
import Spinner from '../spinner/spinner.component';
import Modal, { type ModalTextType, ModalIconTypes } from '../modal/modal.component';
import './sign-in-form.styles.scss';

const defaultFromFields = {
  email: '',
  password: '',
};

function SignInForm() {
  const navigate = useNavigate();
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState<ModalTextType | undefined>(undefined);
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { email, password } = formFields;

  function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  function resetFromFields() {
    setFormFields(defaultFromFields);
  }

  async function submitSignInFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoadingUser(true);

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFromFields();
      navigate('/');
    } catch (error) {
      setModalText({
        header: 'Sign In Error',
        message: 'Error signing in. Please try again.',
      });
      setIsModalOpen(true);
    }

    setIsLoadingUser(false);
  }

  async function signInWithGoogleHandler() {
    setIsLoadingUser(true);
    try {
      await signInWithGooglePopup();
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error) {
        setModalText({
          header: 'Sign In Error',
          message: 'Error signing in. Please try again.',
        });
        setIsModalOpen(true);
      }
    }
    setIsLoadingUser(false);
  }

  function isModalOpenHandler() {
    setIsModalOpen(false);
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form
        onSubmit={submitSignInFormHandler}
        autoComplete="on">
        <FormInput
          labelOptions={{
            label: 'Email',
            htmlFor: 'sign-in-email',
          }}
          inputOptions={{
            required: true,
            type: 'email',
            name: 'email',
            id: 'sign-in-email',
            value: email,
            onChange: inputChangeHandler,
          }}
        />
        <FormInput
          labelOptions={{
            label: 'Password',
            htmlFor: 'sign-in-password',
          }}
          inputOptions={{
            required: true,
            type: 'password',
            name: 'password',
            id: 'sign-in-password',
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
                onClick={signInWithGoogleHandler}>
                Sign in with google
              </Button>
            </Fragment>
          )}
        </div>
      </form>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={isModalOpenHandler}
          modalHeader={modalText?.header}
          modalMessage={modalText?.message}
          modalIconType={ModalIconTypes.Alert}>
          <Button onClick={isModalOpenHandler}>Close</Button>
        </Modal>
      )}
    </div>
  );
}

export default SignInForm;
