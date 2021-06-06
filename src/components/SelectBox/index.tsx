/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useCallback,
  useState,
} from 'react';
import { FiChevronUp } from 'react-icons/fi';
import { Container } from './styles';

interface SelectBoxBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  content: {
    id: string | number;
    data: string;
  }[];
  defaultItem?: string | number;
}

const SelectBoxBase: ForwardRefRenderFunction<
  HTMLInputElement,
  SelectBoxBaseProps
> = ({ placeholder, content, defaultItem, ...rest }, ref): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    string | number | undefined
  >(defaultItem ?? undefined);
  const [selectedOptionName, setSelectedOptionName] = useState(
    content.find((item) => item.id === defaultItem)?.data ?? '',
  );

  const handleSelectMenuOption = useCallback(
    (option: string | number, name: string) => {
      setSelectedOption(option);
      setSelectedOptionName(name);
      setIsOpen(false);
    },
    [],
  );

  return (
    <Container isOpen={isOpen}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <span>
          {selectedOption === undefined ? placeholder : selectedOptionName}
        </span>
        <FiChevronUp />
      </div>
      <ul>
        {content.map((option) => {
          return (
            <li
              key={option.id}
              onClick={() => handleSelectMenuOption(option.id, option.data)}
            >
              <input
                type="radio"
                id="option"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: 0,
                  cursor: 'pointer',
                }}
                ref={ref}
                value={option.id}
                {...rest}
              />
              {option.data}
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export const SelectBox = forwardRef(SelectBoxBase);
