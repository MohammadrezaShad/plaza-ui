import EyeClose from '@plaza-ui/icons/lib/EyeClose';
import EyeOpen from '@plaza-ui/icons/lib/EyeOpen';
import React, {forwardRef, useState} from 'react';

import {FieldProps} from '../../shared/Field.types';
import Field from '../Field';

const PasswordField = forwardRef<HTMLInputElement, FieldProps>((props, ref) => {
  const {
    type: inputType,
    icon: inputIcon,
    label = 'رمزعبور',
    onIconClick: inputOnIconClick,
    children,
    ...restProps
  } = props;

  const textType = 'text';
  const passwordType = 'password';

  const [type, setType] = useState(passwordType);

  const onIconClick = () => {
    setType(type === passwordType ? textType : passwordType);
  };

  return (
    <>
      <Field
        onIconClick={onIconClick}
        icon={type === 'password' ? <EyeOpen /> : <EyeClose />}
        type={type}
        ref={ref}
        label={label}
        {...restProps}
      >
        {children}
      </Field>
    </>
  );
});

export default PasswordField;
PasswordField.displayName = 'PasswordField';
