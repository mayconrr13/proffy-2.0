/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { useForm } from 'react-hook-form';

const InputBase: ForwardRefRenderFunction<HTMLInputElement> = (
  { ...rest },
  ref,
): JSX.Element => {
  return (
    <div>
      <span>Selecione uma disciplina</span>

      <div>
        <div>
          <input
            type="radio"
            id="art"
            value="art"
            name="subject"
            ref={ref}
            {...rest}
          />
          <label htmlFor="art">Artes</label>
        </div>
        <div>
          <input
            type="radio"
            id="bio"
            value="bio"
            name="subject"
            ref={ref}
            {...rest}
          />
          <label htmlFor="bio">Bio</label>
        </div>
        <div>
          <input
            type="radio"
            id="physics"
            value="physics"
            name="subject"
            ref={ref}
            {...rest}
          />
          <label htmlFor="physics">Física</label>
        </div>
        <div>
          <input
            type="radio"
            id="math"
            value="math"
            name="subject"
            ref={ref}
            {...rest}
          />
          <label htmlFor="math">Matemática</label>
        </div>
        <div>
          <input
            type="radio"
            id="math"
            value={0}
            name="subject"
            ref={ref}
            {...rest}
          />
          <label htmlFor="math">Matemática</label>
        </div>
      </div>
    </div>
  );
};

const Input = forwardRef(InputBase);

export const Teste = (): JSX.Element => {
  const { register, handleSubmit } = useForm();

  function submitted(data: any) {
    console.log(data);
  }

  return (
    <div style={{ display: 'flex' }}>
      <form onSubmit={handleSubmit(submitted)}>
        <Input {...register('subject')} />

        <select id="teste" {...register('teste')}>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
