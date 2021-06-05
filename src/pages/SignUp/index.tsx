import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { RegistrationInput } from '../../components/RegistrationInput';
import { RegistrationSideContainer } from '../../components/RegistrationSideContainer';
import { RegistrationSubmitButton } from '../../components/RegistrationSubmitButton';
import { Container, FormContainer, FormSection, Form } from './styles';

import backArrowImg from '../../assets/back.svg';

interface FormProps {
  name: string;
  lastName: string;
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

export const SignUp = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const submitSignUp = useCallback((data) => {
    console.log(data);
  }, []);

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

          <Form onSubmit={handleSubmit(submitSignUp)}>
            <RegistrationInput
              label="Nome"
              type="text"
              firstInput
              {...register('name')}
            />
            <RegistrationInput
              label="Sobrenome"
              type="text"
              {...register('lastName')}
            />
            <RegistrationInput
              label="E-mail"
              type="email"
              {...register('email')}
            />
            <RegistrationInput
              label="Senha"
              type="password"
              lastInput
              isPasswordInput
              {...register('password')}
            />

            <RegistrationSubmitButton text="Concluir Cadastro" />
          </Form>
        </FormSection>
      </FormContainer>

      <RegistrationSideContainer />
    </Container>
  );
};
