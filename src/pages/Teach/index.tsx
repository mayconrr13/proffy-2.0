import { useFieldArray, useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useHistory } from 'react-router';
import firebase from 'firebase';
import {
  Container,
  TopWrapper,
  InformationSection,
  FormWrapper,
  FormContent,
  Form,
  ScheduleContainer,
  ScheduleItem,
  BottomContainer,
  ContactSection,
  ClassSection,
  ScheduleDetails,
  DeleteScheduleSection,
} from './styles';

import { Header } from '../../components/Header';
import { ProfileInput } from '../../components/ProfileInput';
import { SelectBox } from '../../components/SelectBox';
import { BiographyInput } from '../../components/BiographyInput';

import alertImg from '../../assets/alert.svg';
import rocketImg from '../../assets/rocket.svg';
import profileImg from '../../assets/profile-image.jpg';
import {
  scheduleOptions,
  subjectsOptions,
  weekDayOptions,
} from '../../data/selectMenuOptions';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

interface AvailableScheduleProps {
  weekDay: number;
  from: number;
  to: number;
}

interface FormProps {
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

export const Teach = (): JSX.Element => {
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

  const submitProfileChanges = useCallback(async (data: FormProps) => {
    try {
      if (!user) {
        history.push('/');
        return;
      }

      const db = firebase.firestore();
      await db
        .collection('teachers')
        .doc(user?.id)
        .update({
          whatsapp: data.whatsapp,
          bio: data.bio,
          subject: data.subject,
          price: data.price * 100,
          availableSchedule: data.availableSchedule,
        });

      console.log('Cadastro de aula realizado com sucesso');

      history.push('/success/3');

      return;
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      history.push('/login');
      return;
    }

    const getFormInitialData = async () => {
      if (!user) {
        history.push('/');
        return;
      }

      const db = firebase.firestore();
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
  }, []);

  if (isLoading === true) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <TopWrapper>
        <Header pageName="Dar aulas" />

        <InformationSection>
          <h1>
            Que incrível que você <br />
            quer dar aulas.
          </h1>

          <div>
            <p>
              O primeiro passo, é preencher esse <br />
              formulário de inscrição.
            </p>

            <div>
              <img src={rocketImg} alt="Foguete" />
              <span>
                Preparare-se! <br />
                vai ser o máximo.
              </span>
            </div>
          </div>
        </InformationSection>
      </TopWrapper>

      <FormWrapper>
        <Form onSubmit={handleSubmit(submitProfileChanges)}>
          <FormContent>
            <h3>Seus dados</h3>
            <span />

            <ContactSection>
              <div>
                <img src={profileImg} alt="Nome" />
                <h3>Severo Snape</h3>
              </div>

              <ProfileInput
                type="text"
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
                type="number"
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
