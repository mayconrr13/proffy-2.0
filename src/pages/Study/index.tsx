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
import {
  scheduleOptions,
  subjectsOptions,
  weekDayOptions,
} from '../../data/selectMenuOptions';

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
                <span>Disciplina</span>
                <SelectBox placeholder="Disciplina" content={subjectsOptions} />
              </section>
              <div>
                <section>
                  <span>Dia da semana</span>
                  <SelectBox placeholder="Dia" content={weekDayOptions} />
                </section>
                <section>
                  <span>Horário</span>
                  <SelectBox placeholder="Horário" content={scheduleOptions} />
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
