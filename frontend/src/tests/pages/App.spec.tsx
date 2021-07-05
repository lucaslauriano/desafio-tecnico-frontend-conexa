import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { useConsultations } from "../../hooks/useConsultations";
import { Consultation } from "../../types/consultations";
import App from "../../pages";

describe("App component", () => {
  it("renders correctly", () => {
    render(<App />);
  });
});
