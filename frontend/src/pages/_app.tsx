import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker.css";
import { AuthProvider } from "../contexts/AuthContext";
import { queryClient } from ".";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
        <ReactQueryDevtools />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
