/* eslint-disable react/require-default-props */
import { useState } from 'react';
import { Container } from './styles';

import showPasswordImg from '../../assets/show-password.svg';
import hidePasswordImg from '../../assets/hide-password.svg';

interface RegistrationInputProps {
  type: string;
  label: string;
  isPasswordInput?: boolean;
  firstInput?: boolean;
  lastInput?: boolean;
}

export const RegistrationInput = ({
  type,
  label,
  isPasswordInput = false,
  firstInput = false,
  lastInput = false,
}: RegistrationInputProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  return (
    <Container
      isFocused={isFocused}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      isFirstInput={firstInput}
      isLastInput={lastInput}
    >
      {isPasswordInput ? (
        <input type={passwordIsVisible ? 'text' : 'password'} placeholder=" " />
      ) : (
        <input type={type} placeholder=" " />
      )}
      <span>{label}</span>
      {isPasswordInput && (
        <button
          type="button"
          onClick={() => setPasswordIsVisible(!passwordIsVisible)}
        >
          <img
            src={passwordIsVisible ? hidePasswordImg : showPasswordImg}
            alt={passwordIsVisible ? 'Ocultar senha' : 'Mostrar senha'}
          />
        </button>
      )}
    </Container>
  );
};
