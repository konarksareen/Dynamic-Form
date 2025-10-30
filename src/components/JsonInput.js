import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { z } from "zod";

const fieldSchema = z.object({
  label: z.string(),
  name: z.string(),
  type: z.enum([
    "text",
    "number",
    "date",
    "dropdown",
    "checkbox",
    "multiselect",
    "textarea"
  ]),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional(),
  condition: z
    .object({
      dependsOn: z.string(),
      value: z.any()
    })
    .optional(),
  validation: z
    .object({
      pattern: z.string().optional(),
      message: z.string().optional(),
      requiredMessage: z.string().optional()
    })
    .optional(),
  placeholder: z.string().optional(),
  readonly: z.boolean().optional(),
  disabled: z.boolean().optional(),
  hidden: z.boolean().optional()
});

const formSchema = z.object({
  title: z.string(),
  fields: z.array(fieldSchema)
});

const JsonInput = ({ onSchemaSubmit }) => {
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    try {
      setError("");

      const parsed = JSON.parse(jsonText);

      if (typeof parsed !== "object" || parsed === null) {
        throw new Error("JSON must be an object with 'title' and 'fields'.");
      }
      if (!parsed.title || !parsed.fields) {
        throw new Error("Schema must include both 'title' and 'fields' keys.");
      }

      const validation = formSchema.safeParse(parsed);
      if (!validation.success) {
        const messages = validation.error.errors
          .map((e) => e.message)
          .join(", ");
        throw new Error(`Invalid schema: ${messages}`);
      }

      onSchemaSubmit(parsed);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError("Invalid JSON format. Check brackets and commas.");
      } else {
        setError(err.message || "Unexpected error while parsing schema.");
      }
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Enter JSON Schema
      </Typography>

      <TextField
        label="Paste JSON here"
        multiline
        rows={10}
        fullWidth
        variant="outlined"
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        placeholder='{"title": "My Form", "fields": [...]}'
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2, whiteSpace: "pre-line" }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Generate Form
      </Button>
    </Box>
  );
};

export default JsonInput;
