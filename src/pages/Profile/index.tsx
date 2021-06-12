import { useFieldArray, useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAuth } from '../../hooks/useAuth';

import {
  Container,
  TopWrapper,
  UserSection,
  FormWrapper,
  FormContent,
  Form,
  ScheduleContainer,
  ScheduleItem,
  BottomContainer,
  NameSection,
  ContactSection,
  ClassSection,
  ScheduleDetails,
  DeleteScheduleSection,
} from './styles';

import { Header } from '../../components/Header';
import { ProfileInput } from '../../components/ProfileInput';
import { SelectBox } from '../../components/SelectBox';
import { BiographyInput } from '../../components/BiographyInput';

import cameraImg from '../../assets/camera.svg';
import alertImg from '../../assets/alert.svg';
import {
  scheduleOptions,
  subjectsOptions,
  weekDayOptions,
} from '../../data/selectMenuOptions';
import { db } from '../../services/firebase';

interface AvailableScheduleProps {
  weekDay: number;
  from: number;
  to: number;
}

interface FormProps {
  name: string;
  lastName: string;
  email: string;
  whatsapp: string;
  bio: string;
  subject: string;
  price: number;
  availableSchedule: AvailableScheduleProps[];
}

const schema = yup.object().shape({
  whatsapp: yup.string().required('Insira o número do Whatsapp com DDD'),
  bio: yup.string().required('Biografia obrigatória'),
  subject: yup.string().required('Selecione uma disciplina'),
  price: yup.number().required('Informe o preço da sua hora aula'),
});

export const Profile = (): JSX.Element => {
  const [initialAvailableSchedule, setInitialAvailableSchedule] = useState<
    AvailableScheduleProps[]
  >([] as AvailableScheduleProps[]);

  const [initialSubject, setInitialSubject] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const history = useHistory();

  const cleanInitialAvailableSchedule = useCallback(() => {
    if (initialAvailableSchedule.length === 0) {
      return;
    }

    setInitialAvailableSchedule([] as AvailableScheduleProps[]);
  }, [initialAvailableSchedule]);

  const { register, control, handleSubmit, reset } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'availableSchedule',
    control,
  });

  const submitProfileChanges = useCallback(
    async (data) => {
      try {
        if (!user) {
          history.push('/');
          return;
        }

        await db
          .collection('teachers')
          .doc(user?.id)
          .update({
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            whatsapp: data.whatsapp,
            bio: data.bio,
            subject: data.subject,
            price: data.price * 100,
            availableSchedule: data.availableSchedule,
          });

        console.log('Dados atualizados com sucesso');

        history.push('/');

        return;
      } catch (error) {
        console.log(error.message);
      }
    },
    [history, user],
  );

  useEffect(() => {
    const getFormInitialData = async () => {
      if (!user) {
        history.push('/');
        return;
      }

      const response = await db
        .collection('teachers')
        .doc(user?.id)
        .get()
        .then((result) => result.data());

      setInitialAvailableSchedule(
        response?.availableSchedule.map((schedule: AvailableScheduleProps) => {
          return {
            weekDay: Number(schedule.weekDay),
            from: Number(schedule.from),
            to: Number(schedule.to),
          };
        }),
      );

      setInitialSubject(response?.subject);
      reset({
        name: response?.name,
        lastName: response?.lastName,
        email: response?.email,
        whatsapp: response?.whatsapp,
        bio: response?.bio,
        price: response?.price / 100,
        subject: response?.subject,
        availableSchedule: response?.availableSchedule.map(
          (schedule: AvailableScheduleProps) => {
            return {
              weekDay: Number(schedule.weekDay),
              from: Number(schedule.from),
              to: Number(schedule.to),
            };
          },
        ),
      });
      setIsLoading(false);
    };

    getFormInitialData();
  }, [reset, history, user]);

  if (isLoading === true) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <TopWrapper>
        <Header pageName="Meu perfil" />

        <UserSection>
          <div>
            <span>
              <img src={cameraImg} alt="Alterar foto" />
            </span>
          </div>

          <h2>Severo Snape</h2>

          <span>Poções</span>
        </UserSection>
      </TopWrapper>

      <FormWrapper>
        <Form onSubmit={handleSubmit(submitProfileChanges)}>
          <FormContent>
            <h3>Seus dados</h3>
            <span />

            <NameSection>
              <ProfileInput id="name" label="Nome" {...register('name')} />
              <ProfileInput
                id="lastName"
                label="Sobrenome"
                {...register('lastName')}
              />
            </NameSection>
            <ContactSection>
              <ProfileInput id="email" label="E-mail" {...register('email')} />
              <ProfileInput
                id="whatsapp"
                label="Whatsapp"
                {...register('whatsapp')}
              />
            </ContactSection>

            <BiographyInput
              id="biography"
              label="Biografia"
              {...register('bio')}
            />

            <h3>Sobre a aula</h3>
            <span />

            <ClassSection>
              <div>
                <span>Disciplina</span>
                <SelectBox
                  placeholder="Disciplina"
                  content={subjectsOptions}
                  defaultItem={
                    initialSubject !== '' ? initialSubject : undefined
                  }
                  {...register('subject')}
                />
              </div>
              <ProfileInput
                id="price"
                label="Custo da sua hora por aula"
                {...register('price')}
              />
            </ClassSection>

            <ScheduleContainer>
              <section>
                <h3>Horários disponíveis</h3>
                <button
                  type="button"
                  onClick={() =>
                    append({
                      weekDay: 0,
                      from: 0,
                      to: 0,
                    })
                  }
                  disabled={fields.length === 6}
                >
                  + Horário
                </button>
              </section>
              <span />

              {fields.map((field, index) => {
                return (
                  <ScheduleItem key={field.id}>
                    <ScheduleDetails>
                      <div>
                        <span>Dia da semana</span>
                        <SelectBox
                          placeholder="Dia"
                          content={weekDayOptions}
                          defaultItem={
                            index <= initialAvailableSchedule.length - 1
                              ? initialAvailableSchedule[index].weekDay
                              : undefined
                          }
                          {...register(
                            `availableSchedule.${index}.weekDay` as const,
                            {
                              required: true,
                            },
                          )}
                        />
                      </div>

                      <section>
                        <div>
                          <span>De</span>
                          <SelectBox
                            placeholder="Horário"
                            content={scheduleOptions}
                            defaultItem={
                              index <= initialAvailableSchedule.length - 1
                                ? initialAvailableSchedule[index].from
                                : undefined
                            }
                            {...register(
                              `availableSchedule.${index}.from` as const,
                              {
                                required: true,
                              },
                            )}
                          />
                        </div>
                        <div>
                          <span>Até</span>
                          <SelectBox
                            placeholder="Horário"
                            content={scheduleOptions}
                            defaultItem={
                              index <= initialAvailableSchedule.length - 1
                                ? initialAvailableSchedule[index].to
                                : undefined
                            }
                            {...register(
                              `availableSchedule.${index}.to` as const,
                              {
                                required: true,
                              },
                            )}
                          />
                        </div>
                      </section>
                    </ScheduleDetails>

                    <DeleteScheduleSection>
                      <span />
                      <button
                        type="button"
                        onClick={() => {
                          remove(index);
                          cleanInitialAvailableSchedule();
                        }}
                      >
                        Excluir horário
                      </button>
                      <span />
                    </DeleteScheduleSection>
                  </ScheduleItem>
                );
              })}
            </ScheduleContainer>
          </FormContent>

          <BottomContainer>
            <div>
              <img src={alertImg} alt="Atenção" />
              <div>
                <strong>Importante!</strong>
                <span>Preencha todos os dados corretamente</span>
              </div>
            </div>

            <button type="submit">Salvar Alterações</button>
          </BottomContainer>
        </Form>
      </FormWrapper>
    </Container>
  );
};
