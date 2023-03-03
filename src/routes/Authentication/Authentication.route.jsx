import SignUpForm from '../../components/SignUpForm/SignUpForm.component';
import SignInForm from '../../components/SignInForm/SignInForm.component';

import './Authentication.styles.scss';

function Authentication() {
  return (
    <div>
      <div className="authentication-container">
        <SignInForm />
        <SignUpForm />
      </div>
    </div>
  );
}

export default Authentication;
