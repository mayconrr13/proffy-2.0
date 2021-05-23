import { useParams, useHistory } from 'react-router-dom';

import { Container } from './styles';

import doneImg from '../../assets/done.svg';
import { successMessages } from '../../data/successMessages';

interface RouteParams {
  id: string;
}

export const Success = (): JSX.Element => {
  const { id } = useParams<RouteParams>();
  const router = useHistory();

  return (
    <Container>
      <div>
        <img src={doneImg} alt="Sucesso" />

        <h1>{successMessages[Number(id) - 1].heading}</h1>

        <p>{successMessages[Number(id) - 1].message}</p>

        <button
          type="button"
          onClick={() =>
            router.push(successMessages[Number(id) - 1].button.destinationPath)
          }
        >
          {successMessages[Number(id) - 1].button.text}
        </button>
      </div>
    </Container>
  );
};
