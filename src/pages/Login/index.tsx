import {
  Container,
  FormContainer,
  FormSection,
  Form,
  AdditionalInformation,
} from './styles';

import { RegistrationInput } from '../../components/RegistrationInput';

import logoImg from '../../assets/logo.svg';
import descriptionImg from '../../assets/description.svg';
import heartImg from '../../assets/heart.svg';
import { RegistrationSideContainer } from '../../components/RegistrationSideContainer';
import { RegistrationSubmitButton } from '../../components/RegistrationSubmitButton';

export const Login = (): JSX.Element => {
  // exemplo de comparacao de inputRef
  const a = false;
  const b = false;

  return (
    <Container>
      <RegistrationSideContainer />

      <FormContainer>
        <FormSection>
          <strong>Fazer Login</strong>
          <Form>
            <div>
              <RegistrationInput type="e-mail" label="E-mail" firstInput />
              <RegistrationInput
                type="password"
                label="Senha"
                isPasswordInput
                lastInput
              />
            </div>

            <a href="/reset-password">Esqueci minha Senha</a>

            <RegistrationSubmitButton text="Entrar" disabled={!!(!a || !b)} />
          </Form>

          <AdditionalInformation>
            <div>
              <span>Não tem conta?</span>
              <a href="/signup">Cadastre-se</a>
            </div>

            <span>
              É de graça <img src={heartImg} alt="Coração" />
            </span>
          </AdditionalInformation>
        </FormSection>
      </FormContainer>
    </Container>
  );
};
