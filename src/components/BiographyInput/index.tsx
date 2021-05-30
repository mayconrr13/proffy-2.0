import { useState } from 'react';
import { Container } from './styles';

interface BiographyInputProps {
  id: string;
  label: string;
}

export const BiographyInput = ({
  id,
  label,
}: BiographyInputProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container isFocused={isFocused}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </Container>
  );
};
