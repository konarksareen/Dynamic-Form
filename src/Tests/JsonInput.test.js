import { render, screen, fireEvent } from "@testing-library/react";
import JsonInput from "../components/JsonInput";

const validJson = JSON.stringify({
  title: "User Form",
  fields: [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Age", name: "age", type: "number" }
  ]
});

test("renders input area and submit button", () => {
  render(<JsonInput onSchemaSubmit={() => {}} />);
  expect(screen.getByLabelText(/paste json/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /generate form/i })).toBeInTheDocument();
});

test("shows error for invalid JSON", () => {
  render(<JsonInput onSchemaSubmit={() => {}} />);
  fireEvent.change(screen.getByLabelText(/paste json/i), { target: { value: "invalid" } });
  fireEvent.click(screen.getByRole("button", { name: /generate form/i }));
  expect(screen.getByText(/invalid json format/i)).toBeInTheDocument();
});

test("shows error for unsupported schema", () => {
  render(<JsonInput onSchemaSubmit={() => {}} />);
  fireEvent.change(screen.getByLabelText(/paste json/i), { target: { value: '{"abcd": "123"}' } });
  fireEvent.click(screen.getByRole("button", { name: /generate form/i }));
  expect(screen.getByText(/must include both 'title' and 'fields'/i)).toBeInTheDocument();
});

test("calls onSchemaSubmit for valid schema", () => {
  const mockSubmit = jest.fn();
  render(<JsonInput onSchemaSubmit={mockSubmit} />);
  fireEvent.change(screen.getByLabelText(/paste json/i), { target: { value: validJson } });
  fireEvent.click(screen.getByRole("button", { name: /generate form/i }));
  expect(mockSubmit).toHaveBeenCalledTimes(1);
});
