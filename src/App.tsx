import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ResetPassword } from './pages/ResetPassword';
import { GlobalStyle } from './styles/global';

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Login />
    </>
  );
}

export default App;
