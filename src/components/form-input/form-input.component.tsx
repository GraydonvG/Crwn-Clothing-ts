import { type InputHTMLAttributes } from 'react';

import './form-input.styles.scss';

type LabelOptionsType = {
  label: string;
  htmlFor: string;
};

type FormInputProps = {
  labelOptions: LabelOptionsType;
  inputOptions: InputHTMLAttributes<HTMLInputElement>;
};

function FormInput({ labelOptions, inputOptions }: FormInputProps) {
  const { label, htmlFor } = labelOptions;

  return (
    <div className="group">
      <input
        className="form-input"
        {...inputOptions}
      />
      {label && (
        <label
          htmlFor={htmlFor}
          className={`${
            inputOptions.value && typeof inputOptions.value === 'string' && inputOptions.value.length > 0
              ? 'shrink'
              : null
          } form-input-label`}>
          {label}
        </label>
      )}
    </div>
  );
}

export default FormInput;
