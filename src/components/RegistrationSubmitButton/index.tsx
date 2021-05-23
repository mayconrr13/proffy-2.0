/* eslint-disable react/jsx-props-no-spreading */
import { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface RegistrationSubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const RegistrationSubmitButton = ({
  text,
  ...rest
}: RegistrationSubmitButtonProps): JSX.Element => {
  return (
    <Container type="submit" {...rest}>
      {text}
    </Container>
  );
};
