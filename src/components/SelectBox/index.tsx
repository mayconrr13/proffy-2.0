/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useCallback, useState } from 'react';
import { FiChevronUp } from 'react-icons/fi';
import { Container } from './styles';

interface SelectBoxProps {
  placeholder: string;
  content: {
    id: string | number;
    data: string;
  }[];
}

export const SelectBox = ({
  placeholder,
  content,
}: SelectBoxProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | number>();
  const [selectedOptionName, setSelectedOptionName] = useState('');

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
        <span>{!selectedOption ? placeholder : selectedOptionName}</span>
        <FiChevronUp />
      </div>
      <ul>
        {content.map((option) => {
          return (
            <li
              key={option.id}
              onClick={() => handleSelectMenuOption(option.id, option.data)}
            >
              {option.data}
            </li>
          );
        })}
      </ul>
    </Container>
  );
};
