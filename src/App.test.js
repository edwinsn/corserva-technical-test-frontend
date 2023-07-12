import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Sale Orders link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Sale Orders/i);
  expect(linkElement).toBeInTheDocument();
});

