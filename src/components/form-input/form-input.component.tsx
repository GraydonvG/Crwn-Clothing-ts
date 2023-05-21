import { type ChangeEventHandler } from 'react';

import './form-input.styles.scss';

type LabelOptions = {
  label: string;
  htmlFor: string;
};

type InputOptions = {
  required: boolean;
  type: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

type FormInputProps = {
  labelOptions: LabelOptions;
  inputOptions: InputOptions;
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
          className={`${inputOptions.value.length > 0 ? 'shrink' : null} form-input-label`}>
          {label}
        </label>
      )}
    </div>
  );
}

export default FormInput;
