import {
  Container,
  TopWrapper,
  UserSection,
  FormWrapper,
  FormContent,
  Form,
  ScheduleContainer,
  ScheduleItem,
  BottomContainer,
  NameSection,
  ContactSection,
  ClassSection,
  ScheduleDetails,
  DeleteScheduleSection,
} from './styles';

import { Header } from '../../components/Header';
import { ProfileInput } from '../../components/ProfileInput';
import { SelectBox } from '../../components/SelectBox';
import { BiographyInput } from '../../components/BiographyInput';

import cameraImg from '../../assets/camera.svg';
import alertImg from '../../assets/alert.svg';
import {
  scheduleOptions,
  subjectsOptions,
  weekDayOptions,
} from '../../data/selectMenuOptions';

export const Profile = (): JSX.Element => {
  return (
    <Container>
      <TopWrapper>
        <Header pageName="Meu perfil" />

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
