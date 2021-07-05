import {
  Flex,
  Text,
  Button,
  Spinner,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import BlankPage from "../../components/BlankPage";
import Navbar from "../../components/NavBar";
import ListConsultations from "./ListConsultations";
import ScheduleConsultationsModal from "./ScheduleConsultationsModal";
import { useConsultations } from "../../hooks/useConsultations";

const Consultations = () => {
  const { data, isLoading, isFetching, error } = useConsultations();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isLarge = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Flex direction="column" w="100vw" h="100vh">
      <Navbar isLarge={isLarge} />

      <Text
        ml="29"
        mt="12px"
        color="blue.900"
        fontSize={["28", "48px"]}
        fontWeight="700"
      >
        Consultas
      </Text>

      <Flex w="100vw" h="75vh" justify="center" alignItems="center">
        {isLoading ? (
          <Flex>
            <Spinner />
          </Flex>
        ) : !!data && data.length ? (
          <ListConsultations
            consultations={data}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        ) : (
          <BlankPage />
        )}
      </Flex>

      <Flex
        w="100%"
        mx="auto"
        px="6"
        py="4"
        bg={!isLarge && "gray.50"}
        bottom={0}
        justify="space-between"
        position="absolute"
        alignItems="flex-end"
        borderTopColor={!isLarge && "gray.700"}
        borderTopWidth={!isLarge && "1px"}
      >
        {/* todo */}
        <Button color="blue.500" variant="outline" colorScheme="blue">
          Ajuda
        </Button>
        <Button variant="solid" colorScheme="blue" onClick={onOpen}>
          Agendar consulta
        </Button>
      </Flex>

      <ScheduleConsultationsModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Consultations;
