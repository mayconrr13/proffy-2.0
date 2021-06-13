import { useFieldArray, useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useHistory } from 'react-router';

import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import firebase from '../../services/firebase';

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
import {
  scheduleOptions,
  subjectsOptions,
  weekDayOptions,
} from '../../data/selectMenuOptions';

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
  const [initialData, setInitialData] = useState<FormProps>({} as FormProps);

  const [userInitials, setUserInitials] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const history = useHistory();

  const getUserInitials = useCallback((firstName: string, lastName: string) => {
    const firstLetter = firstName.split('')[0];
    const secondLetter = lastName.split('')[0];

    setUserInitials(firstLetter + secondLetter);
  }, []);

  const cleanInitialAvailableSchedule = useCallback(() => {
    if (initialData.availableSchedule.length === 0) {
      return;
    }

    setInitialData({
      ...initialData,
      availableSchedule: [] as AvailableScheduleProps[],
    });
  }, [initialData]);

  const { register, control, handleSubmit, reset } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'availableSchedule',
    control,
  });

  const submitProfileChanges = useCallback(
    async (data: FormProps) => {
      try {
        if (!user) {
          history.push('/');
          return;
        }

        await firebase
          .firestore()
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
      } catch {
        toast('Falha ao atualizar os dados do usuário');
        return;
      }
    },
    [history, user],
  );

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

      try {
        const response = await firebase
          .firestore()
          .collection('teachers')
          .doc(user?.id)
          .get()
          .then((result) => result.data());

        const userInitialData: FormProps = {
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
        };

        reset(userInitialData);
        setInitialData(userInitialData);
        setIsLoading(false);
        return;
      } catch {
        toast('Falha ao carregar os dados do usuário');

        history.push('/');
        return;
      }
    };

    getFormInitialData();
  }, [history, reset, user]);

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
              {user && (
                <div>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <div>{userInitials}</div>
                  )}
                  <h3>{`${user.name} ${user.lastName}`}</h3>
                </div>
              )}

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
                    initialData.subject !== '' ? initialData.subject : undefined
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
                            index <= initialData.availableSchedule.length - 1
                              ? initialData.availableSchedule[index].weekDay
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
                              index <= initialData.availableSchedule.length - 1
                                ? initialData.availableSchedule[index].from
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
                              index <= initialData.availableSchedule.length - 1
                                ? initialData.availableSchedule[index].to
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
