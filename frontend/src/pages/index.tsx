import {
  Box,
  Flex,
  Icon,
  Text,
  Stack,
  Button,
  Center,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import Navbar from "../components/NavBar";
import React, { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthFrame from "../components/AuthFrame";
import Input from "../components/Form/Input";
import { FiHelpCircle } from "react-icons/fi";
import AuthContext from "../contexts/AuthContext";
import { AuthFormData } from "../types/auth";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

export const authFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail é  obrigatório")
    .email("E-mail digitado é inválido"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve conter no mínimo 6 caracteres.")
    .max(64, "Senha deve conter no máximo 64 caracteres."),
});

const App = () => {
  const { login } = useContext(AuthContext);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(authFormSchema),
  });

  const handleAuth: SubmitHandler<AuthFormData> = async (values) => {
    await login(values.email, values.password);
  };

  const isLarge = useBreakpointValue({
    base: false,
    md: true,
  });

  const { errors } = formState;

  return (
    <Flex direction="column" W="100vw" h="100vh">
      <Flex>
        <Navbar isLarge={isLarge} />
      </Flex>
      <Flex mt="60px" direction={["column", "column", "row"]}>
        <Center w="100%" mb={["60px", "60px", "0"]}>
          <Box flex="1">
            <Flex justifyContent="center">
              <Heading ml="6" color="blue.900" fontSize={["32px", "52px"]}>
                Faça Login
              </Heading>
            </Flex>
            <Flex justifyContent="center">{isLarge && <AuthFrame />}</Flex>
          </Box>
        </Center>
        <Center w="100%">
          <Flex
            w="100%"
            as="form"
            flexDir="column"
            maxWidth={isLarge ? "235px" : "275px"}
            onSubmit={handleSubmit(handleAuth)}
          >
            <Stack spacing="4">
              <Input
                id="email"
                name="email"
                size="sm"
                type="email"
                label="E-mail"
                error={errors.email}
                bgColor="gray.50"
                variant="flushed"
                placeholder="Digite seu e-mail"
                {...register("email")}
              />
              <Input
                id="password"
                name="password"
                size="sm"
                type="password"
                error={errors.password}
                label={
                  <Flex>
                    <Text>Senha </Text>
                    <Icon as={FiHelpCircle} mt={1} ml={1} />
                  </Flex>
                }
                bgColor="gray.50"
                variant="flushed"
                placeholder="Digite sua senha"
                {...register("password")}
              />
            </Stack>

            <Button
              mt="68px"
              bg="blue.500"
              type="submit"
              color="white"
              isLoading={formState.isSubmitting}
              colorScheme="blue"
              isFullWidth
              borderRadius={8}
            >
              Entrar
            </Button>
          </Flex>
        </Center>
      </Flex>
    </Flex>
  );
};

export default App;
