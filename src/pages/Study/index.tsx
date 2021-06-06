/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Header } from '../../components/Header';
import { SelectBox } from '../../components/SelectBox';
import { TeacherItem } from '../../components/TeacherItem/index';
import { api } from '../../services/api';

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
  const [totalTeacherRegistered, setTotalTeacherRegistered] = useState(0);

  const { register, handleSubmit } = useForm();

  const handleSearchTeachers = useCallback(async (data) => {
    const formatedData = {
      ...data,
      day: Number(data.day),
      hour: Number(data.hour),
    };

    const { subject, day, hour } = formatedData;

    try {
      const response = await api.get(
        `/teachers?subject=${subject}&availableSchedule.weekDay=${day}`,
      );

      if (response.data.length === 0) {
        return;
      }

      const availableTeachers = response.data.filter(
        (teacher: TeacherProps) => {
          const dateIndex = teacher.availableSchedule.findIndex(
            (schedule) => schedule.weekDay === day,
          );

          const availability = !!(
            teacher.availableSchedule[dateIndex].from <= hour &&
            teacher.availableSchedule[dateIndex].to >= hour
          );

          return availability && teacher;
        },
      );

      setTeachers(availableTeachers);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    const numberOfTeachersRegistered = async () => {
      const response = await api.get('/teachers');

      setTotalTeacherRegistered(response.data.length);
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
                  name="subject"
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
        {teachers.length === 0 ? (
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
