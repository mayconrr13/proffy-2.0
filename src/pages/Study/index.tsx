import { Header } from '../../components/Header';
import { TeacherItem } from '../../components/TeacherItem/index';

import {
  TopWrapper,
  InformationSection,
  FilterOptionsSection,
  TeachersContainer,
  InformationContainer,
} from './styles';

import geekImg from '../../assets/geek.svg';

export const Study = (): JSX.Element => {
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
