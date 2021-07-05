import { PatientProps } from "./patient";

export type Consultation = {
  date: string;
  id: number;
  patient: PatientProps;
  patientId: number;
};
