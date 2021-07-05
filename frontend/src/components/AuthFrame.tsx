import { Box, Flex, Grid } from "@chakra-ui/layout";

import Image from "next/image";

const AuthFrame = () => {
  return (
    <Flex h="auto" mt="57px" align="center">
      <Flex width="138px" alignSelf="center" mt="108px" mr="12px">
        <Image
          src="/loginFrame01.svg"
          alt="Picture 01"
          width="138px"
          height="154px"
        />
      </Flex>
      <Flex width="176px">
        <Image src="/login.svg" alt="Picture 02" width="176px" height="265px" />
      </Flex>
    </Flex>
  );
};

export default AuthFrame;
