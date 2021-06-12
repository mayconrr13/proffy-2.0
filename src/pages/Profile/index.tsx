import { useFieldArray, useForm } from 'react-hook-form';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
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
import { auth, db, storage } from '../../services/firebase';

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
  const { user } = useAuth();
  const history = useHistory();

  const [initialData, setInitialData] = useState<FormProps>({} as FormProps);
  const [subject, setSubject] = useState<string>('');

  const [isLoading, setIsLoading] = useState(true);

  const [localURL, setLocalURL] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const [userInitials, setUserInitials] = useState('');

  async function handleImagePreview(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      setLocalURL('');
      return;
    }

    const file = e.target.files[0];

    setLocalURL(URL.createObjectURL(file));

    try {
      if (userAvatar !== '') {
        await storage.refFromURL(userAvatar).delete();
      }

      const fileRef = storage.ref().child(file.name);
      await fileRef.put(file);

      const avatarURL = await fileRef.getDownloadURL();

      setUserAvatar(avatarURL);
      await auth.currentUser?.updateProfile({
        photoURL: avatarURL,
      });
      if (user) {
        await db.collection('teachers').doc(user.id).update({
          avatar: avatarURL,
        });
      }

      return;
    } catch (error) {
      console.log(error);
    }
  }

  const getUserSubject = useCallback((subjectCode) => {
    const selectedSubject = subjectsOptions.find(
      (option) => option.id === subjectCode,
    );

    if (selectedSubject) {
      setSubject(selectedSubject.data);
    }
  }, []);

  const getUserInitials = useCallback((firstName: string, lastName: string) => {
    const firstLetter = firstName.split('')[0];
    const secondLetter = lastName.split('')[0];

    setUserInitials(firstLetter + secondLetter);
  }, []);

  const clearInitialAvailableSchedule = useCallback(() => {
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
    async (data) => {
      try {
        if (!user) {
          history.push('/');
          return;
        }

        await db
          .collection('teachers')
          .doc(user.id)
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
        .doc(user.id)
        .get()
        .then((result) => result.data());

      const userInitialData: FormProps = {
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
      };

      if (response?.avatar === '') {
        getUserInitials(response?.name, response?.lastName);
      } else {
        setUserAvatar(response?.avatar);
      }

      reset(userInitialData);
      getUserSubject(userInitialData.subject);
      setInitialData(userInitialData);
      setIsLoading(false);
    };

    getFormInitialData();
  }, [reset, history, user, getUserSubject, getUserInitials]);

  if (isLoading === true) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <TopWrapper>
        <Header pageName="Meu perfil" />

        <UserSection>
          <div>
            <label htmlFor="avatar">
              <input
                type="file"
                id="avatar"
                onChange={(e) => handleImagePreview(e)}
                name="avatar"
              />
              <img src={cameraImg} alt="Alterar avatar" />
            </label>

            {!isLoading && !localURL && !userAvatar ? (
              <div>{userInitials}</div>
            ) : (
              <img src={localURL === '' ? userAvatar : localURL} alt="Avatar" />
            )}
          </div>

          <h2>{`${initialData.name} ${initialData.lastName}`}</h2>

          <span>{subject}</span>
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
                    initialData.subject !== '' ? initialData.subject : undefined
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
                          clearInitialAvailableSchedule();
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
