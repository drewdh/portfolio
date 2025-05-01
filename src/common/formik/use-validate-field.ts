import { useFormikContext } from 'formik';
import { useCallback } from 'react';

export default function useValidateField(name: string) {
  const { validateField } = useFormikContext();

  return useCallback((): void => {
    try {
      validateField(name);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(
          `Attempted to validate a field that has no validation schema: ${name}. This warning is only shown during development.`
        );
      }
    }
  }, [validateField, name]);
}
