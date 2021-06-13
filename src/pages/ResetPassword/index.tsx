import { Link, useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { toast } from 'react-toastify';
import { RegistrationSideContainer } from '../../components/RegistrationSideContainer';
import { RegistrationSubmitButton } from '../../components/RegistrationSubmitButton';
import { Container, FormContainer, FormSection, Form } from './styles';

import backArrowImg from '../../assets/back.svg';
import { RegistrationInput } from '../../components/RegistrationInput';
import firebase from '../../services/firebase';

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

export const ResetPassword = (): JSX.Element => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const submitPasswordReset = useCallback(
    async (data) => {
      try {
        await firebase.auth().sendPasswordResetEmail(data.email);

        history.push('/');
      } catch {
        toast('Falha ao enviar o e-mail de alteração de senha');
        return;
      }
    },
    [history],
  );

  return (
    <Container>
      <RegistrationSideContainer />

      <FormContainer>
        <FormSection>
          <Link to="/login">
            <img src={backArrowImg} alt="Voltar" />
          </Link>

          <strong>
            Eita, esqueceu
            <br /> sua senha?
          </strong>

          <Form onSubmit={handleSubmit(submitPasswordReset)}>
            <RegistrationInput
              label="E-mail"
              type="email"
              firstInput
              lastInput
              {...register('email')}
            />

            <RegistrationSubmitButton text="Enviar" />
          </Form>
        </FormSection>
      </FormContainer>
    </Container>
  );
};
