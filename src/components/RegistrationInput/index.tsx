/* eslint-disable react/require-default-props */
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useState,
} from 'react';
import { Container } from './styles';

import showPasswordImg from '../../assets/show-password.svg';
import hidePasswordImg from '../../assets/hide-password.svg';

interface RegistrationInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label: string;
  isPasswordInput?: boolean;
  firstInput?: boolean;
  lastInput?: boolean;
}

const RegistrationInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  RegistrationInputProps
> = (
  {
    type,
    label,
    isPasswordInput = false,
    firstInput = false,
    lastInput = false,
    ...rest
  }: RegistrationInputProps,
  ref,
): JSX.Element => {
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
        <input
          type={passwordIsVisible ? 'text' : 'password'}
          placeholder=" "
          ref={ref}
          {...rest}
        />
      ) : (
        <input type={type} placeholder=" " ref={ref} {...rest} />
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

export const RegistrationInput = forwardRef(RegistrationInputBase);
