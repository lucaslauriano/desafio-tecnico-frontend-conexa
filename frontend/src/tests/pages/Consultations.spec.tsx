import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { useConsultations } from "../../hooks/useConsultations";
import Consultations from "../../pages/consultations";

jest.mock("@chakra-ui/react");

describe("Consultations component", () => {
  it("renders correctly", () => {
    const useConsultationsMocked = mocked(useConsultations);
    render(<Consultations />);
  });
});
