import { FormikValues, getIn, useFormikContext } from 'formik';
import Multiselect, { MultiselectProps } from '@cloudscape-design/components/multiselect';
import useValidateField from 'common/formik/use-validate-field';

export default function FormikMultiselect<T extends FormikValues>({
  name,
  onChange,
  onBlur,
  ...props
}: Props) {
  const { values, setFieldValue, touched, setFieldTouched } = useFormikContext<T>();
  const validateField = useValidateField(name);

  return (
    <Multiselect
      {...props}
      selectedOptions={getIn(values, name)}
      onBlur={(event) => {
        setFieldTouched(name);
        validateField();
        onBlur?.(event);
      }}
      onChange={async (event) => {
        await setFieldValue(name, event.detail.selectedOptions);
        if (getIn(touched, name)) {
          validateField();
        }
        onChange?.(event);
      }}
    />
  );
}

interface Props extends Omit<MultiselectProps, 'selectedOptions'> {
  name: string;
}
