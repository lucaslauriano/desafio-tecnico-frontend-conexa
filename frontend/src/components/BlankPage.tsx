import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

const BlankPage = () => {
  return (
    <Flex justify="flex-end" direction="column">
      <Flex
        mb="14"
        width={["300px", "400px", "450px", "553px"]}
        justify="flex-end"
        direction="column"
      >
        <Flex justify="flex-end" mr={["15px", "0px", "0px"]}>
          <Box>
            <Image
              src="/certificates.svg"
              alt="Picture 01"
              width={90}
              height={60}
            />
          </Box>
        </Flex>

        <Flex justify="center" align="center" my="15px">
          <Text
            w="206px"
            h="48px"
            px="6"
            color="gray.500"
            fontSize="18"
            fontWeight="700"
          >
            Não há nenhuma consulta agendada
          </Text>
        </Flex>

        <Flex flex="1" justify="flex-start" ml={["15px", "0px", "0px"]}>
          <Box>
            <Image src="/vessel.svg" alt="Picture 02" width={81} height={89} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BlankPage;
