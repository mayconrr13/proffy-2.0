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
  email: string | null;
  name: string | null;
  lastName: string | null;
  avatar: string | null;
}

interface AuthContextData {
  user: UserProps | null;
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
  console.log(user);

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
      } else {
        setUser(null);
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

  // useEffect(() => {
  //   async function getUserData() {
  //     try {
  //       if (localStorage.getItem('proffyauth.user') === null) {
  //         return;
  //       }

  //       const currentUser: UserProps = JSON.parse(
  //         localStorage.getItem('proffyauth.user') as string,
  //       );

  //       const response = await api.get(`/teachers?id=${currentUser.id}`);

  //       const updatedUser = {
  //         id: response.data[0].id,
  //         email: response.data[0].email,
  //         name: response.data[0].name,
  //         lastName: response.data[0].lastName,
  //         avatar: response.data[0].avatar,
  //       };

  //       setUser(updatedUser);
  //       console.log(updatedUser);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }

  //   getUserData();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
