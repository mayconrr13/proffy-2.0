import {
  Container,
  TopWrapper,
  InsideAppHeader,
  InformationSection,
  FormWrapper,
  FormContent,
  Form,
  BiographyInput,
  ScheduleContainer,
  ScheduleItem,
  BottomContainer,
  ContactSection,
  ClassSection,
  ScheduleDetails,
  DeleteScheduleSection,
} from './styles';

import { ProfileInput } from '../../components/ProfileInput';

import backArrowImg from '../../assets/back-inside-app.svg';
import logoImg from '../../assets/logo-inside-app.svg';
import alertImg from '../../assets/alert.svg';
import rocketImg from '../../assets/rocket.svg';
import profileImg from '../../assets/profile-image.jpg';

export const Teach = (): JSX.Element => {
  return (
    <Container>
      <TopWrapper>
        <InsideAppHeader>
          <header>
            <img src={backArrowImg} alt="Voltar" />
            <span>Dar Aulas</span>
            <img src={logoImg} alt="Logo" />
          </header>
        </InsideAppHeader>

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

            <BiographyInput>
              <label htmlFor="biography">Biografia</label>
              <textarea id="biography" />
            </BiographyInput>

            <h3>Sobre a aula</h3>
            <span />

            <ClassSection>
              <ProfileInput id="subject" label="Disciplina" />
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
                  <ProfileInput id="weekDay" label="Dia da semana" />

                  <section>
                    <ProfileInput id="from" label="Das" />
                    <ProfileInput id="to" label="Até" />
                  </section>
                </ScheduleDetails>

                <DeleteScheduleSection>
                  <span />
                  <button type="button">Excluir horário</button>
                  <span />
                </DeleteScheduleSection>
              </ScheduleItem>
              <ScheduleItem>
                <ScheduleDetails>
                  <ProfileInput id="weekDay" label="Dia da semana" />

                  <section>
                    <ProfileInput id="from" label="Das" />
                    <ProfileInput id="to" label="Até" />
                  </section>
                </ScheduleDetails>

                <DeleteScheduleSection>
                  <span />
                  <button type="button">Excluir horário</button>
                  <span />
                </DeleteScheduleSection>
              </ScheduleItem>
              <ScheduleItem>
                <ScheduleDetails>
                  <ProfileInput id="weekDay" label="Dia da semana" />

                  <section>
                    <ProfileInput id="from" label="Das" />
                    <ProfileInput id="to" label="Até" />
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
