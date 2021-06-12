import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { api } from '../services/api';
import firebase from '../services/firebase';

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

  async function getUser() {
    // const userData = await firebase
    //   .firestore()
    //   .collection('teachers')
    //   .where('email', '==', 'mayconrr1395@gmail.com')
    //   .get()
    //   .then((result) => console.log(result.docs[0].data()));

    const userData = await firebase
      .firestore()
      .collection('teachers')
      .doc(user?.id)
      .get()
      .then((result) => result.data());

    console.log(userData);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const db = firebase.firestore();
        const userData = await db
          .collection('teachers')
          .where('email', '==', currentUser.email)
          .get()
          .then((result) => result.docs[0].data());

        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          lastName: userData.lastName,
          avatar: userData.avatar,
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
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
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        await firebase.auth().currentUser?.updateProfile({
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
      firebase.auth().signOut();
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

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
