import { SelectBox } from '../components/SelectBox';

import {
  scheduleOptions,
  subjectsOptions,
  weekDayOptions,
} from '../data/selectMenuOptions';

export const Teste = (): JSX.Element => {
  return (
    <div style={{ display: 'flex' }}>
      <h1>select box</h1>
      <SelectBox
        placeholder="Selecione uma disciplina"
        content={subjectsOptions}
      />
      <SelectBox placeholder="Selecione um horário" content={scheduleOptions} />
      <SelectBox placeholder="Selecione um dia" content={weekDayOptions} />
    </div>
  );
};
