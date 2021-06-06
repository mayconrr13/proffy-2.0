import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useState,
} from 'react';
import { Container } from './styles';

interface ProfileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const ProfileInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  ProfileInputProps
> = ({ id, label, ...rest }: ProfileInputProps, ref): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container isFocused={isFocused}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
        ref={ref}
      />
    </Container>
  );
};

export const ProfileInput = forwardRef(ProfileInputBase);
