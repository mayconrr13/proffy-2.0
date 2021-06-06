import { useFieldArray, useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

  const submitProfileChanges = useCallback((data) => {
    console.log(data);
  }, []);

  useEffect(() => {
    const getFormInitialData = async () => {
      const response = await api.get(`/teachers?email=mayconrr13@gmail.com`);

      setInitialAvailableSchedule([]);
      setInitialSubject('');
      reset({
        whatsapp: '',
        bio: '',
        price: 0,
        subject: '',
        availableSchedule: [],
      });
      // setInitialAvailableSchedule(response.data[0].availableSchedule);
      // setInitialSubject(response.data[0].subject);
      // reset({
      //   whatsapp: response.data[0].whatsapp,
      //   bio: response.data[0].bio,
      //   price: response.data[0].price / 100,
      //   subject: response.data[0].subject,
      //   availableSchedule: response.data[0].availableSchedule,
      // });
      setIsLoading(false);
    };

    getFormInitialData();
  }, [reset]);

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
