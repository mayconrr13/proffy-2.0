import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ResetPassword } from './pages/ResetPassword';
import { Success } from './pages/Success';
import { Profile } from './pages/Profile';
import { Teach } from './pages/Teach';
import { Study } from './pages/Study';

import { GlobalStyle } from './styles/global';
import { AuthProvider } from './hooks/useAuth';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyle />
        <ToastContainer autoClose={3000} hideProgressBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/success/:id" component={Success} />
          <Route path="/profile" component={Profile} />
          <Route path="/teach" component={Teach} />
          <Route path="/study" component={Study} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
