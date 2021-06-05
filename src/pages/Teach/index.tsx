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

export const Teach = (): JSX.Element => {
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
        <Form>
          <FormContent>
            <h3>Seus dados</h3>
            <span />

            <ContactSection>
              <div>
                <img src={profileImg} alt="Nome" />
                <h3>Severo Snape</h3>
              </div>

              <ProfileInput id="whatsapp" label="Whatsapp" />
            </ContactSection>

            <BiographyInput id="biography" label="Biografia" />

            <h3>Sobre a aula</h3>
            <span />

            <ClassSection>
              <div>
                <span>Disciplina</span>
                <SelectBox placeholder="Disciplina" content={subjectsOptions} />
              </div>
              <ProfileInput id="price" label="Custo da sua hora por aula" />
            </ClassSection>

            <ScheduleContainer>
              <section>
                <h3>Horários disponíveis</h3>
                <button type="button">+ Horário</button>
              </section>
              <span />

              <ScheduleItem>
                <ScheduleDetails>
                  <div>
                    <span>Dia da semana</span>
                    <SelectBox placeholder="Dia" content={weekDayOptions} />
                  </div>

                  <section>
                    <div>
                      <span>De</span>
                      <SelectBox
                        placeholder="Horário"
                        content={scheduleOptions}
                      />
                    </div>
                    <div>
                      <span>Até</span>
                      <SelectBox
                        placeholder="Horário"
                        content={scheduleOptions}
                      />
                    </div>
                  </section>
                </ScheduleDetails>

                <DeleteScheduleSection>
                  <span />
                  <button type="button">Excluir horário</button>
                  <span />
                </DeleteScheduleSection>
              </ScheduleItem>
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
