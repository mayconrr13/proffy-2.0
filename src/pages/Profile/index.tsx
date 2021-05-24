import {
  Container,
  TopWrapper,
  InsideAppHeader,
  UserSection,
  FormWrapper,
  FormContent,
  Form,
  BiographyInput,
  ScheduleContainer,
  ScheduleItem,
  BottomContainer,
  NameSection,
  ContactSection,
  ClassSection,
  ScheduleDetails,
  DeleteScheduleSection,
} from './styles';

import { ProfileInput } from '../../components/ProfileInput';

import backArrowImg from '../../assets/back-inside-app.svg';
import logoImg from '../../assets/logo-inside-app.svg';
import cameraImg from '../../assets/camera.svg';
import alertImg from '../../assets/alert.svg';

export const Profile = (): JSX.Element => {
  return (
    <Container>
      <TopWrapper>
        <InsideAppHeader>
          <header>
            <img src={backArrowImg} alt="Voltar" />
            <span>Meu perfil</span>
            <img src={logoImg} alt="Logo" />
          </header>
        </InsideAppHeader>

        <UserSection>
          <div>
            <span>
              <img src={cameraImg} alt="Alterar foto" />
            </span>
          </div>

          <h2>Severo Snape</h2>

          <span>Poções</span>
        </UserSection>
      </TopWrapper>

      <FormWrapper>
        <Form>
          <FormContent>
            <h3>Seus dados</h3>
            <span />

            <NameSection>
              <ProfileInput id="name" label="Nome" />
              <ProfileInput id="lastName" label="Sobrenome" />
            </NameSection>
            <ContactSection>
              <ProfileInput id="email" label="E-mail" />
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
