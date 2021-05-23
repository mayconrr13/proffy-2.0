import { Link } from 'react-router-dom';
import { RegistrationInput } from '../../components/RegistrationInput';
import { RegistrationSideContainer } from '../../components/RegistrationSideContainer';
import { RegistrationSubmitButton } from '../../components/RegistrationSubmitButton';
import { Container, FormContainer, FormSection, Form } from './styles';

import backArrowImg from '../../assets/back.svg';

export const SignUp = (): JSX.Element => {
  // exemplo de comparacao de inputRef
  const a = false;
  const b = false;

  return (
    <Container>
      <FormContainer>
        <FormSection>
          <Link to="/login">
            <img src={backArrowImg} alt="Voltar" />
          </Link>

          <strong>Cadastro</strong>
          <span>
            Preencha os dados abaixo <br />
            para começar.
          </span>

          <Form>
            <RegistrationInput label="Nome" type="text" firstInput />
            <RegistrationInput label="Sobrenome" type="text" />
            <RegistrationInput label="E-mail" type="email" />
            <RegistrationInput
              label="Senha"
              type="password"
              lastInput
              isPasswordInput
            />

            <RegistrationSubmitButton
              text="Concluir Cadastro"
              disabled={!!(!a || !b)}
            />
          </Form>
        </FormSection>
      </FormContainer>

      <RegistrationSideContainer />
    </Container>
  );
};
