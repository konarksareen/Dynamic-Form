export const checkConditionalVisibility = (field, values) => {
    if (!field.condition) return true;
    const { dependsOn, value } = field.condition;
    return values[dependsOn] === value;
  };
  