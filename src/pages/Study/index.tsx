import { TeacherItem } from '../../components/TeacherItem/index';

import {
  TopWrapper,
  InsideAppHeader,
  InformationSection,
  FilterOptionsSection,
  TeachersContainer,
  InformationContainer,
} from './styles';

import backArrowImg from '../../assets/back-inside-app.svg';
import logoImg from '../../assets/logo-inside-app.svg';
import geekImg from '../../assets/geek.svg';

export const Study = (): JSX.Element => {
  return (
    <div>
      <TopWrapper>
        <InsideAppHeader>
          <div>
            <img src={backArrowImg} alt="Voltar" />
            <span>Estudar</span>
            <img src={logoImg} alt="Logo" />
          </div>
        </InsideAppHeader>

        <InformationContainer>
          <InformationSection>
            <div>
              <h1>
                Proffys <br />
                disponíveis
              </h1>

              <div>
                <img src={geekImg} alt="Geek" />
                <span>
                  32 proffys <br /> cadastrados
                </span>
              </div>
            </div>

            <FilterOptionsSection>
              <section>
                <label htmlFor="subject">Matéria</label>
                <select name="subject" id="subject">
                  <option value="math">Matemática</option>
                  <option value="chemestry">Química</option>
                </select>
              </section>
              <div>
                <section>
                  <label htmlFor="weekDay">Dia da semana</label>
                  <select name="weekDay" id="weekDay">
                    <option value="monday">Segunda</option>
                    <option value="tuesday">Terça</option>
                  </select>
                </section>
                <section>
                  <label htmlFor="hour">Horário</label>
                  <select name="hour" id="hour">
                    <option value="eigthAM">8 horas</option>
                    <option value="nineAM">9 horas</option>
                  </select>
                </section>
              </div>
            </FilterOptionsSection>
          </InformationSection>
        </InformationContainer>
      </TopWrapper>

      <TeachersContainer>
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </TeachersContainer>
    </div>
  );
};
