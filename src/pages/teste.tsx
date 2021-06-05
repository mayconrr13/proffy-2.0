/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';

const InputBase: ForwardRefRenderFunction<HTMLInputElement> = (
  { ...rest },
  ref,
): JSX.Element => {
  const [option, setOption] = useState('');

  return (
    <div>
      <input type="text" value={option} {...rest} />
      <ul>
        <li onClick={() => setOption('1')} style={{ position: 'relative' }}>
          <input
            type="radio"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              // opacity: 0,
              backgroundColor: 'tomato',
            }}
            ref={ref}
            value="1"
            {...rest}
          />
          1
        </li>
        <li onClick={() => setOption('2')} style={{ position: 'relative' }}>
          <input
            type="radio"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: 0,
            }}
            ref={ref}
            value="2"
            {...rest}
          />
          2
        </li>
        <li onClick={() => setOption('3')} style={{ position: 'relative' }}>
          <input
            type="radio"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: 0,
            }}
            ref={ref}
            value="3"
            {...rest}
          />
          3
        </li>
        <li onClick={() => setOption('4')} style={{ position: 'relative' }}>
          <input
            type="radio"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: 0,
            }}
            ref={ref}
            value="4"
            {...rest}
          />
          4
        </li>
      </ul>
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
        <h1>select box</h1>
        <Input {...register('input')} />
        <button type="submit">ok</button>
      </form>
    </div>
  );
};
