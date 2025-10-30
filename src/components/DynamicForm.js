import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import FieldRenderer from "./FieldRenderer";
import { validateForm } from "./ValidationHelper";

const DynamicForm = ({ schema, onReset }) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, newErrors } = validateForm(schema.fields, formValues);
    setErrors(newErrors);
    if (valid) {
      setSubmitted(true);
      console.log("Form Output:", formValues);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>{schema.title}</Typography>

      {schema.fields.map((field) => (
        <FieldRenderer
          key={field.name}
          field={field}
          value={formValues[field.name]}
          onChange={handleChange}
          allValues={formValues}
          error={errors[field.name]}
        />
      ))}

      <Button variant="contained" type="submit" sx={{ mt: 2 }}>Submit</Button>

      {submitted && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Form Data</Typography>
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

export default DynamicForm;
