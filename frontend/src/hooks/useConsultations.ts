import { useQuery } from "react-query";
import { Consultation } from "../types/consultations";
import { api } from "../utils/axios";

export const getConsultations = async (): Promise<Consultation[]> => {
  const { data } = await api.get("consultations?_expand=patient");

  const consultations = data.map(
    (item) => {
      return {
        date: item.date,
        id: item.id,
        patient: {
          email: item.patient.email,
          firstName: item.patient.first_name,
          id: item.patient.id,
          lastName: item.patient.last_name,
        },
        patientId: item.patientId,
      };
    },
    {
      refetchInterval: 1000,
    }
  );
  return consultations;
};

export const useConsultations = () => {
  return useQuery("consultations", getConsultations, {
    /*    staleTime: 1000 * 10, */
  });
};
