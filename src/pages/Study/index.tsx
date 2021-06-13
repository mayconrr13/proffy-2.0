/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import firebase from '../../services/firebase';

import { Header } from '../../components/Header';
import { SelectBox } from '../../components/SelectBox';
import { TeacherItem } from '../../components/TeacherItem/index';

import {
  TopWrapper,
  InformationSection,
  FilterOptionsSection,
  TeachersContainer,
  InformationContainer,
} from './styles';

import geekImg from '../../assets/geek.svg';
import searchImg from '../../assets/search.svg';

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

interface TeacherProps {
  id: string;
  name: string;
  lastName: string;
  email: string;
  avatar: string;
  whatsapp: string;
  subject: string;
  bio: string;
  price: number;
  availableSchedule: AvailableScheduleProps[];
}

export const Study = (): JSX.Element => {
  const [teachers, setTeachers] = useState<TeacherProps[]>(
    [] as TeacherProps[],
  );
  const [noTeachersFound, setNoTeachersFound] = useState<boolean>(false);
  const [totalTeacherRegistered, setTotalTeacherRegistered] = useState(0);

  const { register, handleSubmit } = useForm();

  const handleSearchTeachers = useCallback(
    async (data) => {
      if (Object.values(data).some((field) => field == null || undefined)) {
        toast('Por favor, selecione uma opção em todos os campos');
        return;
      }

      const formatedData = {
        ...data,
        day: Number(data.day),
        hour: Number(data.hour),
      };

      const { subject, day, hour } = formatedData;

      try {
        const response = await firebase
          .firestore()
          .collection('teachers')
          .where('subject', '==', subject)
          .get()
          .then((results) =>
            results.docs.map((doc) => doc.data() as TeacherProps),
          );

        if (response.length === 0 && teachers.length !== 0) {
          setTeachers([]);
          setNoTeachersFound(true);
          return;
        }

        const filteredTeachersByWeekDay = response.filter((teacher) => {
          return teacher.availableSchedule.some(
            (date) => Number(date.weekDay) === day,
          );
        });

        const availableTeachers = filteredTeachersByWeekDay.filter(
          (teacher) => {
            const isAvailable = teacher.availableSchedule.some((date) => {
              return Number(date.from) <= hour && Number(date.to) >= hour;
            });

            return isAvailable && teacher;
          },
        );

        if (availableTeachers.length === 0) {
          setNoTeachersFound(true);
        } else {
          setTeachers(availableTeachers);
          setNoTeachersFound(false);
        }

        return;
      } catch (error) {
        toast('Erro ao buscar lista de professores');
        return;
      }
    },
    [teachers.length],
  );

  useEffect(() => {
    const numberOfTeachersRegistered = async () => {
      const response = await firebase
        .firestore()
        .collection('teachers')
        .get()
        .then((results) => results.docs.length);

      setTotalTeacherRegistered(response);
    };

    numberOfTeachersRegistered();
  }, []);

  return (
    <div>
      <TopWrapper>
        <Header pageName="Estudar" />

        <InformationContainer>
          <InformationSection>
            <div>
              <h1>
                Proffys <br />
                disponíveis
              </h1>

              {totalTeacherRegistered && (
                <div>
                  <img src={geekImg} alt="Geek" />
                  <span>
                    {totalTeacherRegistered} proffys <br /> cadastrados
                  </span>
                </div>
              )}
            </div>

            <FilterOptionsSection onSubmit={handleSubmit(handleSearchTeachers)}>
              <section>
                <span>Disciplina</span>
                <SelectBox
                  placeholder="Disciplina"
                  content={subjectsOptions}
                  {...register('subject')}
                />
              </section>
              <div>
                <section>
                  <span>Dia da semana</span>
                  <SelectBox
                    placeholder="Dia"
                    content={weekDayOptions}
                    {...register('day')}
                  />
                </section>
                <section>
                  <span>Horário</span>
                  <SelectBox
                    placeholder="Horário"
                    content={scheduleOptions}
                    {...register('hour')}
                  />
                </section>
              </div>
              <button type="submit">
                <img src={searchImg} alt="Procurar" />
              </button>
            </FilterOptionsSection>
          </InformationSection>
        </InformationContainer>
      </TopWrapper>

      <TeachersContainer>
        {noTeachersFound ? (
          <p>Nenhum professor encontrado</p>
        ) : (
          teachers.map((teacher) => {
            return <TeacherItem key={teacher.id} teacher={teacher} />;
          })
        )}
      </TeachersContainer>
    </div>
  );
};
