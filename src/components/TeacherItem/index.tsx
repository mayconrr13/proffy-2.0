import { useCallback } from 'react';
import {
  Container,
  TeacherSchedule,
  DetailsSection,
  ContactSection,
} from './styles';

import dayHourImg from '../../assets/day-hour.svg';
import whatsappImg from '../../assets/whatsapp.svg';
import { api } from '../../services/api';
import { scheduleOptions, subjectsOptions } from '../../data/selectMenuOptions';

const weekDaysInPortugues = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

interface AvailableScheduleProps {
  weekDay: number;
  from: number;
  to: number;
}

interface TeacherProps {
  teacher: {
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
  };
}

export const TeacherItem = ({ teacher }: TeacherProps): JSX.Element => {
  const formatedSubject = (subjectId: string): string => {
    const selectedSubject = subjectsOptions.find(
      (subject) => subject.id === subjectId,
    );

    return selectedSubject?.data ?? '';
  };

  const formatedHour = (hour: number): string => {
    if (hour === 0) {
      return '';
    }
    return `${(hour / 60).toFixed(0)}h`;
  };

  const formatedPrice = (value: number): string => {
    return `R$ ${(value / 100).toFixed(0)},00`;
  };

  const formatedTeacherInfo = {
    ...teacher,
    subject: formatedSubject(teacher.subject),
    price: formatedPrice(teacher.price),
    availableSchedule: weekDaysInPortugues.map((day, index) => {
      const scheduleInformed = teacher.availableSchedule.find(
        (schedule) => Number(schedule.weekDay) === index,
      );

      if (scheduleInformed !== undefined) {
        return {
          weekDay: day,
          from: formatedHour(Number(scheduleInformed.from)),
          to: formatedHour(Number(scheduleInformed.to)),
          isAvailable: !!(scheduleInformed.from || scheduleInformed.to),
        };
      }

      return {
        weekDay: day,
        from: '',
        to: '',
        isAvailable: false,
      };
    }),
  };

  const getInTouchWithTeacher = useCallback(
    async (whatsapp: string, id: string) => {
      try {
        await api.post('/connections', {
          connection: id,
        });

        window.open(`https://wa.me/55${whatsapp}`);

        return;
      } catch (error) {
        alert(error.message);
      }
    },
    [],
  );

  return (
    <Container>
      <DetailsSection>
        <div>
          <img
            src={formatedTeacherInfo.avatar}
            alt={formatedTeacherInfo.name}
          />
          <div>
            <strong>{`${formatedTeacherInfo.name} ${formatedTeacherInfo.lastName}`}</strong>
            <span>{formatedTeacherInfo.subject}</span>
          </div>
        </div>

        <div>
          <p>{formatedTeacherInfo.bio}</p>
        </div>

        <div>
          {formatedTeacherInfo.availableSchedule.map((schedule) => {
            return (
              <TeacherSchedule
                key={schedule.weekDay}
                isAvailable={schedule.isAvailable}
              >
                <span />
                <div>
                  <span>Dia</span>
                  <strong>{schedule.weekDay}</strong>
                </div>
                <img src={dayHourImg} alt="Referente" />
                <div>
                  <span>Horário</span>
                  <strong>
                    {schedule.from} - {schedule.to}
                  </strong>
                </div>
              </TeacherSchedule>
            );
          })}
        </div>
      </DetailsSection>

      <ContactSection>
        <div>
          <span>Preço/hora</span>
          <strong>{formatedTeacherInfo.price}</strong>
        </div>

        <button
          type="button"
          onClick={() =>
            getInTouchWithTeacher(
              formatedTeacherInfo.whatsapp,
              formatedTeacherInfo.id,
            )
          }
        >
          <img src={whatsappImg} alt="Whatsapp" />
          <span>Entrar em contato</span>
        </button>
      </ContactSection>
    </Container>
  );
};
