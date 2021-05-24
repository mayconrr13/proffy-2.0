import { useState } from 'react';
import { Container } from './styles';

interface ProfileInputProps {
  id: string;
  label: string;
}

export const ProfileInput = ({ id, label }: ProfileInputProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container
      isFocused={isFocused}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} />
    </Container>
  );
};
