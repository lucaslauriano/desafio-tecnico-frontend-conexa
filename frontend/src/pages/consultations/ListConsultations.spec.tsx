import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { useConsultations } from "../../hooks/useConsultations";
import { Consultation } from "../../types/consultations";
import ListConsultations from "./ListConsultations";

jest.mock("react-query", () => {
  return {
    useMutation: () => {},
  };
});

const consultations = [
  {
    patientId: 1,
    patient: {
      id: 1,
      firstName: "Frodo",
      lastName: "Baggins",
      email: "frodo.baggins@mail.com",
    },
    date: "2021-06-09T07:00:00.000Z",
    id: 3,
  },
];

describe("ListConsultations component", () => {
  it("renders correctly", () => {
    const { debug } = render(
      <ListConsultations
        consultations={[]}
        isFetching={true}
        isLoading={false}
      />
    );

    debug();
  });

  it("renders correctly when have consultations", () => {
    const { debug } = render(
      <ListConsultations
        consultations={consultations}
        isFetching={true}
        isLoading={false}
      />
    );

    debug();
  });
});
