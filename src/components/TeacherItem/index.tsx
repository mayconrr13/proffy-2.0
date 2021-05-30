import {
  Container,
  TeacherSchedule,
  DetailsSection,
  ContactSection,
} from './styles';

import dayHourImg from '../../assets/day-hour.svg';
import profileImg from '../../assets/profile-image.jpg';
import whatsappImg from '../../assets/whatsapp.svg';

export const TeacherItem = (): JSX.Element => {
  return (
    <Container>
      <DetailsSection>
        <div>
          <img src={profileImg} alt="Profile" />
          <div>
            <strong>Severo Snape</strong>
            <span>Poções</span>
          </div>
        </div>

        <div>
          <p>Entusiasta das melhores tecnologias de química avançada.</p>
          <p>
            Apaixonado por explodir coisas em laboratório e por mudar a vida das
            pessoas através de experiências. Mais de 200.000 pessoas já passaram
            por uma das minhas explosões.
          </p>
        </div>

        <div>
          <TeacherSchedule>
            <div>
              <span>Dia</span>
              <strong>Segunda</strong>
            </div>
            <img src={dayHourImg} alt="Referente" />
            <div>
              <span>Horário</span>
              <strong>18h - 18h</strong>
            </div>
          </TeacherSchedule>
          <TeacherSchedule>
            <div>
              <span>Dia</span>
              <strong>Terça</strong>
            </div>
            <img src={dayHourImg} alt="Referente" />
            <div>
              <span>Horário</span>
              <strong>-</strong>
            </div>
          </TeacherSchedule>
          <TeacherSchedule>
            <div>
              <span>Dia</span>
              <strong>Quarta</strong>
            </div>
            <img src={dayHourImg} alt="Referente" />
            <div>
              <span>Horário</span>
              <strong>8h - 18h</strong>
            </div>
          </TeacherSchedule>
          <TeacherSchedule>
            <div>
              <span>Dia</span>
              <strong>Quinta</strong>
            </div>
            <img src={dayHourImg} alt="Referente" />
            <div>
              <span>Horário</span>
              <strong>7h - 9h</strong>
            </div>
          </TeacherSchedule>
          <TeacherSchedule>
            <div>
              <span>Dia</span>
              <strong>Sexta</strong>
            </div>
            <img src={dayHourImg} alt="Referente" />
            <div>
              <span>Horário</span>
              <strong>10h - 13h</strong>
            </div>
          </TeacherSchedule>
          <TeacherSchedule>
            <div>
              <span>Dia</span>
              <strong>Sábado</strong>
            </div>
            <img src={dayHourImg} alt="Referente" />
            <div>
              <span>Horário</span>
              <strong>9h - 22h</strong>
            </div>
          </TeacherSchedule>
        </div>
      </DetailsSection>

      <ContactSection>
        <div>
          <span>Preço/hora</span>
          <strong>R$ 20,00</strong>
        </div>

        <button type="button">
          <img src={whatsappImg} alt="Whatsapp" />
          <span>Entrar em contato</span>
        </button>
      </ContactSection>
    </Container>
  );
};
