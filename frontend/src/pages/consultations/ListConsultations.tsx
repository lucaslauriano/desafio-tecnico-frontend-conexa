import {
  Td,
  Tr,
  Flex,
  Text,
  Table,
  Tbody,
  Button,
  Spinner,
} from "@chakra-ui/react";
import Pagination from "../../components/Pagination";
import { formatDate } from "../../utils/format";
import SkeletonTBody from "../../components/SkeletonTable";
import { Consultation } from "../../types/consultations";
import { queryClient } from "..";
import { useMutation } from "react-query";
import { api } from "../../utils/axios";
interface ListConsultationsProps {
  consultations?: Consultation[];
  isFetching?: boolean;
  isLoading?: boolean;
}

const ListConsultations = ({
  isLoading,
  isFetching,
  consultations,
}: ListConsultationsProps) => {
  const attendConsultation = useMutation(
    async (id: number) => {
      const { data } = await api.delete(`consultations/${id}`);

      return data.response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("consultations");
      },
    }
  );

  const handleAttendConsultation = async (id: number) => {
    await attendConsultation.mutateAsync(id);
  };

  return (
    <Flex
      w="100%"
      align="center"
      justify="center"
      maxWidth={520}
      direction="column"
    >
      <Text w="100%" pl="22px" mt="12px" fontSize="16" fontWeight="700">
        {`${consultations.length} consultas agendadas`}
      </Text>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table variant="unstyled">
          {!isLoading && isFetching ? (
            <SkeletonTBody />
          ) : (
            <Tbody>
              {consultations?.map((item) => (
                <Tr key={item.id}>
                  <Td w="80%">
                    <Flex direction="column">
                      <Text fontSize="16">{`${item.patient.firstName} ${item.patient.lastName} `}</Text>
                      <Text fontSize="12">{formatDate(item.date)}</Text>
                    </Flex>
                  </Td>
                  <Td w="20%">
                    <Button
                      h="40px"
                      w="75px"
                      size="md"
                      variant="solid"
                      onClick={() => handleAttendConsultation(item.id)}
                      fontSize="14px"
                      colorScheme="blue"
                      borderRadius="8px"
                    >
                      Atender
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      )}
      {/* todo */}
      <Pagination />
    </Flex>
  );
};

export default ListConsultations;
