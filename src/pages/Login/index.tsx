import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

import { RegistrationInput } from '../../components/RegistrationInput';
import { RegistrationSideContainer } from '../../components/RegistrationSideContainer';
import { RegistrationSubmitButton } from '../../components/RegistrationSubmitButton';

import {
  Container,
  FormContainer,
  FormSection,
  Form,
  AdditionalInformation,
} from './styles';

import heartImg from '../../assets/heart.svg';

interface FormProps {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Insira um e-mail válido.')
    .required('Insira um e-mail válido.'),
  password: yup.string().min(8, 'A senha deve conter no mínimo 8 dígitos'),
});

export const Login = (): JSX.Element => {
  const { register, handleSubmit } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const { signIn } = useAuth();

  const submitLogin = useCallback(
    async (data) => {
      const { email, password } = data;

      try {
        await signIn(email, password);
        return;
      } catch (error) {
        return toast('Erro ao fazer login!');
      }
    },
    [signIn],
  );

  return (
    <Container>
      <RegistrationSideContainer />

      <FormContainer>
        <FormSection>
          <strong>Fazer Login</strong>
          <Form onSubmit={handleSubmit(submitLogin)}>
            <div>
              <RegistrationInput
                type="e-mail"
                label="E-mail"
                firstInput
                {...register('email')}
              />
              <RegistrationInput
                type="password"
                label="Senha"
                isPasswordInput
                lastInput
                {...register('password')}
              />
            </div>

            <Link to="/reset-password">Esqueci minha Senha</Link>

            <RegistrationSubmitButton text="Entrar" type="submit" />
          </Form>

          <AdditionalInformation>
            <div>
              <span>Não tem conta?</span>
              <Link to="/signup">Cadastre-se</Link>
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
