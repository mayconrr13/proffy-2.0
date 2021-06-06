import {
  forwardRef,
  ForwardRefRenderFunction,
  TextareaHTMLAttributes,
  useState,
} from 'react';
import { Container } from './styles';

interface BiographyInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
}

const BiographyInputBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  BiographyInputProps
> = ({ id, label, ...rest }: BiographyInputProps, ref): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container isFocused={isFocused}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        ref={ref}
        {...rest}
      />
    </Container>
  );
};

export const BiographyInput = forwardRef(BiographyInputBase);
