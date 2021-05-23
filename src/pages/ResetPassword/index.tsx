import { RegistrationSideContainer } from '../../components/RegistrationSideContainer';
import { RegistrationSubmitButton } from '../../components/RegistrationSubmitButton';
import { Container, FormContainer, FormSection, Form } from './styles';

import backArrowImg from '../../assets/back.svg';
import { RegistrationInput } from '../../components/RegistrationInput';

export const ResetPassword = (): JSX.Element => {
  // exemplo de comparacao de inputRef
  const a = false;
  const b = false;

  return (
    <Container>
      <RegistrationSideContainer />

      <FormContainer>
        <FormSection>
          <a href="/login">
            <img src={backArrowImg} alt="Voltar" />
          </a>

          <strong>
            Eita, esqueceu
            <br /> sua senha?
          </strong>

          <Form>
            <RegistrationInput
              label="E-mail"
              type="email"
              firstInput
              lastInput
            />

            <RegistrationSubmitButton text="Enviar" disabled={!!(!a || !b)} />
          </Form>
        </FormSection>
      </FormContainer>
    </Container>
  );
};
