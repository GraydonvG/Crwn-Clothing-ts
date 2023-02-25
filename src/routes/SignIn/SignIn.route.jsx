import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../Utilities/firebase.utility';
import SignUpForm from '../../components/SignUpForm/SignUpForm.component';

function SignIn() {
  async function logGoogleUser() {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
}

export default SignIn;
