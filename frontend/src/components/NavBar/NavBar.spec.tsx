import { render } from "@testing-library/react";
import Navbar from ".";
import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { AuthProvider } from "../../contexts/AuthContext";

import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { mocked } from "ts-jest/utils";

jest.mock("next/router");

const AuthContextProvider = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

const wrapper = ({ children }) => (
  <AuthContextProvider>{children}</AuthContextProvider>
);

const mockLogout = jest.fn().mockImplementation(() => {
  useRouter().push("/");
});

const mockUseContext = jest.fn().mockImplementation(() => ({
  user: {},
  isAutenticated: true,
  logout: mockLogout,
}));

React.useContext = mockUseContext;

describe("NavBar component", () => {
  it("renders correctly", () => {
    const useRouterMocked = mocked(useRouter);

    const pushMocked = jest.fn();
    useRouterMocked.mockReturnValueOnce({
      push: pushMocked,
    } as any);

    const { debug } = render(<Navbar isLarge={true} />);

    debug();
  });

  it("renders correctly when authenticated", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const { debug } = render(<Navbar isLarge={true} />);

    debug();
  });
});
