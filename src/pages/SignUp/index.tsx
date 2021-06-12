import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

import { v4 as uuid } from 'uuid';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import firebase from '../../services/firebase';
import { RegistrationInput } from '../../components/RegistrationInput';
import { RegistrationSideContainer } from '../../components/RegistrationSideContainer';
import { RegistrationSubmitButton } from '../../components/RegistrationSubmitButton';
import { Container, FormContainer, FormSection, Form } from './styles';

import backArrowImg from '../../assets/back.svg';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

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
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const submitSignUp = useCallback(
    async (data) => {
      const { name, lastName, email, password } = data;

      signUp(name, lastName, email, password);

      try {
        const response = await api.get(`/teachers?email=${email}`);

        if (response.data.length !== 0) {
          console.log('E-mail já cadastrado');
          return;
        }

        // await api.post('/teachers', {
        //   id: uuid(),
        //   name,
        //   lastName,
        //   email,
        //   avatar: '',
        //   whatsapp: '',
        //   bio: '',
        //   subject: '',
        //   price: 0,
        //   availableSchedule: [],
        // });

        const userId = uuid();

        const db = firebase.firestore();
        await db.collection('teachers').doc(userId).set({
          id: userId,
          name,
          lastName,
          email,
          avatar: '',
          whatsapp: '',
          bio: '',
          subject: '',
          price: 0,
          availableSchedule: [],
        });

        history.push('/success/1');
        return;
      } catch (error) {
        console.log(error.message);
      }
    },
    [history],
  );

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
