import { render, screen } from "@testing-library/react";
import BlankPage from "./BlankPage";

describe("BlankPage component", () => {
  it("renders correctly", () => {
    render(<BlankPage />);

    expect(screen.getByText("Não há nenhuma consulta agendada"));
  });
});
