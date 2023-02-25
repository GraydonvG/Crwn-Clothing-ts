import { Fragment, useState } from 'react';

const defaultFromFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { displayName, email, password, confirmPassword } = formFields;

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <Fragment>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={() => {}}>
        <label htmlFor="displayName">Display Name</label>
        <input
          required
          name="displayName"
          type="text"
          value={displayName}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          type="email"
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          type="password"
          value={password}
          onChange={handleInputChange}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          required
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleInputChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </Fragment>
  );
}

export default SignUpForm;
