import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { auth, db } from '../services/firebase';

interface AuthProviderProps {
  children: ReactNode;
}

interface UserProps {
  id: string;
  email: string;
  name: string;
  lastName: string;
  avatar: string;
}

interface AuthContextData {
  user: UserProps | null;
  isLoading: boolean;
  setUser: (user: UserProps | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    name: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userData = await db
          .collection('teachers')
          .where('email', '==', currentUser.email)
          .get()
          .then((result) => result.docs.map((doc) => doc.data()));

        setUser({
          id: userData[0].id,
          email: userData[0].email,
          name: userData[0].name,
          lastName: userData[0].lastName,
          avatar: userData[0].avatar,
        });

        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        await auth.signInWithEmailAndPassword(email, password);
        return;
      } catch (error) {
        console.log(error.message);
      }
    },
    [],
  );

  const signUp = useCallback(
    async (
      name: string,
      lastName: string,
      email: string,
      password: string,
    ): Promise<void> => {
      try {
        await auth.createUserWithEmailAndPassword(email, password);

        await auth.currentUser?.updateProfile({
          displayName: `${name} ${lastName}`,
        });
        return;
      } catch (error) {
        console.log(error.message);
      }
    },
    [],
  );

  const signOut = useCallback((): void => {
    try {
      auth.signOut();
      return;
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, setUser, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};
