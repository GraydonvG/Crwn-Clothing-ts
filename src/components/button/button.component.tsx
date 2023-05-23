import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import './button.styles.scss';

export enum ButtonType {
  Google = 'google-sign-in',
  Inverted = 'inverted',
  Warning = 'warning',
  White = 'white',
}

type ButtonProps = {
  children: ReactNode;
  buttonType?: ButtonType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, buttonType, ...otherProps }: ButtonProps) {
  return (
    <button
      className={`button-container ${[buttonType]}`}
      {...otherProps}>
      {children}
    </button>
  );
}

export default Button;
