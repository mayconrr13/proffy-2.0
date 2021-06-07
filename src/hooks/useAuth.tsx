import { createContext, useContext, ReactNode, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface UserProps {
  id: string;
  email: string;
}

interface AuthContextData {
  user: UserProps;
  setUser: (user: UserProps) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  console.log(user);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
