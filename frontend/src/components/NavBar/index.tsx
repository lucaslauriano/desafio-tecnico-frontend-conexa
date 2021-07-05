import React, { useContext } from "react";
import SearchBox from "./SearchBox";
import { Flex, Text, Center, Button } from "@chakra-ui/react";
import Image from "next/image";
import AuthContext from "../../contexts/AuthContext";
interface NavbarProps {
  isLarge: boolean;
}
const Navbar = ({ isLarge }: NavbarProps) => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  return (
    <Flex
      w="100%"
      h="60px"
      as="header"
      px="6"
      mx="auto"
      align="center"
      maxWidth="100%"
      boxShadow="base"
    >
      <Flex
        h="auto"
        width={!isLarge && "100%"}
        align={!isAuthenticated && !isLarge && "center"}
        justifyContent={!isAuthenticated && !isLarge && "center"}
      >
        <Flex maxWidth="141px">
          <Image
            src="/logo.svg"
            alt="Logo of the Conexa Company"
            width={141}
            height={23}
          />
        </Flex>
      </Flex>

      {isAuthenticated && isLarge && (
        <Center flex="1">
          {/* todo */}
          <SearchBox />
        </Center>
      )}

      {isAuthenticated && (
        <Flex align="center" ml="auto">
          {isLarge && <Text mr="15px">Olá, {`Dr. ${user?.name}`}</Text>}
          <Button
            w="57px"
            h="32px"
            color="blue.500"
            border="2px"
            variant="outline"
            onClick={logout}
            colorScheme="blue"
          >
            Sair
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
