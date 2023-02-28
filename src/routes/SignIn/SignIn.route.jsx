import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../Utilities/firebase/firebase.utility';
import SignUpForm from '../../components/SignUpForm/SignUpForm.component';
import SignInForm from '../../components/SignInForm/SignInForm.component';
import './SignIn.styles.scss';

function SignIn() {
  async function logGoogleUser() {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
  }

  return (
    <div>
      <div className="form-container">
        <SignInForm logGoogleUser={logGoogleUser} />
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignIn;
