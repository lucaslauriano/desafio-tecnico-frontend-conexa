import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  createContext,
} from "react";
import type { FC, ReactNode } from "react";
import { api } from "../utils/axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { AuthFormData } from "../types/auth";
import { parseCookies, setCookie, destroyCookie } from "nookies";
interface AuthState {
  isInitialised: boolean;
  isAuthenticated: boolean;
  user: UserProps | null;
}

type UserProps = {
  name: string;
};

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitialiseAction = {
  type: "INITIALISE";
  payload: {
    isAuthenticated: boolean;
    user: UserProps | null;
  };
};

type LoginAction = {
  type: "LOGIN";
  payload: {
    user: UserProps;
  };
};

type LogoutAction = {
  type: "LOGOUT";
};

type Action = InitialiseAction | LoginAction | LogoutAction;

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const setSession = (accessToken: string | null): void => {
  if (accessToken) {
    setCookie(undefined, "@conexa.token", accessToken, {
      path: "/",
    });
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    destroyCookie(undefined, "@conexa.token");
    delete api.defaults.headers.common.Authorization;
  }
};

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "INITIALISE": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext<AuthContextValue>({
  ...initialAuthState,
  login: () => Promise.resolve(),
  logout: () => {},
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProps>();
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const router = useRouter();

  const signIn = useMutation(
    async (values: AuthFormData) => {
      const user = {
        email: values.email,
        password: values.password,
      };
      try {
        const response = await api.post("login", {
          ...user,
        });
        const { name } = response.data;
        setUser({ name });
        setSession(response.data.token);
        const { token } = response.data;

        dispatch({
          type: "LOGIN",
          payload: {
            user: name,
          },
        });
        setCookie(undefined, "@conexa.token", token, {
          path: "/",
        });
        return response;
      } catch (error) {
        console.log("erro", error);
        console.log("erro", error);
      }
    },
    {
      onSuccess: () => {
        router.push("consultations");
      },
    }
  );

  const login = useCallback(
    async (email: string, password: string) => {
      await signIn.mutateAsync({ email, password });
    },
    [user]
  );

  const logout = useCallback(() => {
    setSession(null);
    router.push("/");
    dispatch({ type: "LOGOUT" });
  }, []);

  useEffect(() => {
    const initialise = async () => {
      try {
        const { "@conexa.token": accessToken } = parseCookies();

        if (accessToken) {
          setSession(accessToken);

          router.push("/consultations");

          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: true,
              user: user,
            },
          });
        } else {
          router.push("/");
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        router.push("/");
        dispatch({
          type: "INITIALISE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialise();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
