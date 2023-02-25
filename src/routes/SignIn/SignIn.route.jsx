import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../Utilities/firebase.utility';

function SignIn() {
  async function logGoogleUser() {
    const response = await signInWithGooglePopup();
    await createUserDocumentFromAuth(response.user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
}

export default SignIn;
