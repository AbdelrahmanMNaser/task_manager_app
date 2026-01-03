export interface TaskFormErrors {
  titleError: string;
  descriptionError: string;
}

export interface TaskFormData {
  title: string;
  description: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: TaskFormErrors;
}

export const validateTaskForm = (data: TaskFormData): ValidationResult => {
  const errors: TaskFormErrors = {
    titleError: "",
    descriptionError: "",
  };
  let isValid = true;

  if (!data.title.trim()) {
    errors.titleError = "Title is required";
    isValid = false;
  }

  if (!data.description.trim()) {
    errors.descriptionError = "Description is required";
    isValid = false;
  }

  return { isValid, errors };
};
