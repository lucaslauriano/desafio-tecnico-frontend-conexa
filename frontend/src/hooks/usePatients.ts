import { useQuery } from "react-query";
import { PatientProps } from "../types/patient";
import { api } from "../utils/axios";

export const getPatients = async (): Promise<PatientProps[]> => {
  const { data } = await api.get("patients");

  const patients = data.map((item) => {
    return {
      id: item.id,
      email: item.email,
      firstName: item.first_name,
      lastName: item.last_name,
    };
  });
  return patients;
};

export const usePatients = () => {
  return useQuery("patients", getPatients);
};
