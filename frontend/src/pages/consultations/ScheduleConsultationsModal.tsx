import React, { useEffect, useState } from "react";
import {
  Flex,
  Modal,
  Stack,
  Button,
  HStack,
  Spacer,
  Select,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import Input from "../../components/Form/Input";
import { ptBR } from "date-fns/locale";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { SubmitHandler, useForm } from "react-hook-form";
import { QueryClient, useMutation } from "react-query";
import { api } from "../../utils/axios";
import { usePatients } from "../../hooks/usePatients";
import { queryClient } from "..";
interface ScheduleConsultationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ConsultationFormData = {
  patient: number;
  date: string;
};

const ScheduleConsultationsModal = ({
  isOpen,
  onClose,
}: ScheduleConsultationsModalProps) => {
  const { data: patientsData } = usePatients();

  registerLocale("pt-BR", ptBR);

  const createConsultation = useMutation(
    async (values: ConsultationFormData) => {
      const consultation = {
        patientId: values.patient,
        date: startDate,
      };
      const response = await api.post("consultations", {
        ...consultation,
      });

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("consultations");
        onClose && onClose();
      },
    }
  );
  const [startDate, setStartDate] = useState(new Date());
  const handleChangeData = (date) => {
    setStartDate(date);
  };
  const { register, handleSubmit, formState } = useForm();
  const handleSchecuelConsultation: SubmitHandler<ConsultationFormData> =
    async (values) => {
      if (values.patient && startDate) {
        createConsultation.mutateAsync(values);
      }
    };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <Flex
            as="form"
            onSubmit={handleSubmit(handleSchecuelConsultation)}
            direction="column"
          >
            <ModalHeader>Agendar Consulta</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={6} mb={10}>
                <Select
                  id="patient"
                  name="patient"
                  variant="flushed"
                  placeholder="Selecione o Paciente"
                  {...register("patient")}
                >
                  {!!patientsData &&
                    patientsData.map((item) => (
                      <option key={item.id} value={item.id}>
                        {`${item.firstName} ${item.firstName}`}
                      </option>
                    ))}
                </Select>

                <DatePicker
                  id="date"
                  name="date"
                  customInput={
                    <Input
                      id="date"
                      name="date"
                      label="Data e hora da consulta"
                      variant="flushed"
                    />
                  }
                  locale="pt-BR"
                  selected={startDate}
                  onChange={(date) => handleChangeData(date)}
                  dateFormat="dd/MM/yyyy' às 'HH:mm"
                  showTimeSelect
                />
              </Stack>
            </ModalBody>

            <ModalFooter>
              <HStack flex="1" justify="space-between">
                <Button variant="outline" onClick={onClose} colorScheme="blue">
                  Cancelar
                </Button>
                <Spacer />
                <Button
                  mr={3}
                  type="submit"
                  isLoading={formState.isSubmitting}
                  colorScheme="blue"
                >
                  Agendar
                </Button>
              </HStack>
            </ModalFooter>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScheduleConsultationsModal;
