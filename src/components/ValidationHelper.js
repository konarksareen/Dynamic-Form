export const validateForm = (fields, values) => {
    let valid = true;
    let newErrors = {};
  
    fields.forEach((f) => {
      const val = values[f.name];
      if (f.required && !val) {
        valid = false;
        newErrors[f.name] = f.validation?.requiredMessage || "This field is required";
      } else if (f.validation?.pattern && val) {
        const regex = new RegExp(f.validation.pattern);
        if (!regex.test(val)) {
          valid = false;
          newErrors[f.name] = f.validation.message || "Invalid input";
        }
      }
    });
  
    return { valid, newErrors };
  };
  