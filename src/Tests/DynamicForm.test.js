import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DynamicForm from "../Components/DynamicForm";

describe("DynamicForm Component", () => {
  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "age", label: "Age", type: "number" },
    {
      name: "gender",
      label: "Gender",
      type: "dropdown",
      options: ["Male", "Female", "Other"]
    },
    {
      name: "hobbies",
      label: "Hobbies",
      type: "multiselect",
      options: ["Reading", "Gaming", "Traveling"]
    }
  ];

  const mockSubmit = jest.fn();

  beforeEach(() => {
    render(<DynamicForm fields={fields} onSubmit={mockSubmit} />);
  });

  test("renders all input fields", () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /gender/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /hobbies/i })).toBeInTheDocument();
  });

  test("updates text and number fields correctly", () => {
    const nameInput = screen.getByLabelText(/name/i);
    const ageInput = screen.getByLabelText(/age/i);

    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(ageInput, { target: { value: "25" } });

    expect(nameInput.value).toBe("John");
    expect(ageInput.value).toBe("25");
  });

  test("selects dropdown and multiselect options", async () => {
    const genderDropdown = screen.getByRole("combobox", { name: /gender/i });
    fireEvent.mouseDown(genderDropdown);
    fireEvent.click(screen.getByText("Male"));
    expect(genderDropdown).toHaveTextContent("Male");

    const hobbiesDropdown = screen.getByRole("combobox", { name: /hobbies/i });
    fireEvent.mouseDown(hobbiesDropdown);
    fireEvent.click(screen.getByText("Reading"));
    fireEvent.click(screen.getByText("Gaming"));
    expect(hobbiesDropdown).toHaveTextContent("Reading, Gaming");
  });

  test("submits form with correct data", async () => {
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: "30" } });

    const genderDropdown = screen.getByRole("combobox", { name: /gender/i });
    fireEvent.mouseDown(genderDropdown);
    fireEvent.click(screen.getByText("Female"));

    const hobbiesDropdown = screen.getByRole("combobox", { name: /hobbies/i });
    fireEvent.mouseDown(hobbiesDropdown);
    fireEvent.click(screen.getByText("Traveling"));

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: "Alice",
        age: "30",
        gender: "Female",
        hobbies: ["Traveling"]
      });
    });
  });
});
