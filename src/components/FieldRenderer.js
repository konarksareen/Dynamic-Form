import React from "react";
import {
  TextField, Checkbox, FormControlLabel, Select,
  MenuItem, FormControl, InputLabel, OutlinedInput, Box
} from "@mui/material";
import { checkConditionalVisibility } from "../utils/conditionalUtils";

const FieldRenderer = ({ field, value, onChange, allValues, error }) => {
  if (field.hidden || !checkConditionalVisibility(field, allValues)) return null;

  const commonProps = {
    name: field.name,
    label: field.label,
    required: field.required,
    disabled: field.disabled,
    inputProps: { readOnly: field.readonly },
    placeholder: field.placeholder || field.label,
    value: value || "",
    onChange: (e) => onChange(field.name, e.target.value),
    fullWidth: true,
    error: !!error,
    helperText: error || "",
    sx: { mb: 2 }
  };

  switch (field.type) {
    case "text":
      return <TextField {...commonProps} />;
    case "textarea":
      return <TextField {...commonProps} multiline minRows={3} />;
    case "date":
      return <TextField {...commonProps} type="date" InputLabelProps={{ shrink: true }} />;
    case "dropdown":
      return (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{field.label}</InputLabel>
          <Select
          labelId={`${field.name}-label`}
            value={value || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            label={field.label}
          >
            {field.options.map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    case "multiselect":
      return (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{field.label}</InputLabel>
          <Select
          labelId={`${field.name}-label`}
            multiple
            value={value || []}
            onChange={(e) => onChange(field.name, e.target.value)}
            input={<OutlinedInput label={field.label} />}
          >
            {field.options.map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    case "checkbox":
      return (
        <FormControlLabel
          control={<Checkbox checked={!!value} onChange={(e) => onChange(field.name, e.target.checked)} />}
          label={field.label}
        />
      );
    default:
      return null;
  }
};

export default FieldRenderer;
