import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import { SelectProps } from '@cloudscape-design/components/select';
import { MultiselectProps } from '@cloudscape-design/components/multiselect';
import Box from '@cloudscape-design/components/box';
import { FormikProvider, useFormik } from 'formik';
import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import { format } from 'date-fns/format';
import * as yup from 'yup';
import { useLocalStorage } from 'usehooks-ts';

import FormikTiles from 'common/formik/tiles';
import FormikFormField from 'common/formik/form-field';
import FormikInput from 'common/formik/input';
import FormikSlider from 'common/formik/slider';
import FormikTextarea from 'common/formik/textarea';
import FormikTimeInput from 'common/formik/time-input';
import FormikDatePicker from 'common/formik/date-picker';
import FormikSelect from 'common/formik/select';
import FormikMultiselect from 'common/formik/multiselect';
import styles from './styles.module.scss';
import { LocalStorageKey } from 'utilities/local-storage-keys';
import { Modifier, Outcome, OutcomeDetails, TierDivision } from './types';
import { modifierOptions, outcomeLabels, tierDivisionOptions } from './constants';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <SpaceBetween size="s">
      <Header>{title}</Header>
      <SpaceBetween size="m">{children}</SpaceBetween>
    </SpaceBetween>
  );
}

interface FormValues extends Omit<OutcomeDetails, 'date' | 'id' | 'tierDivision' | 'modifiers'> {
  date: string;
  time: string;
  tierDivisionOption: SelectProps.Option | null;
  modifiersOptions: MultiselectProps.Option[] | null;
}

const validationSchema = yup.object({
  outcome: yup.string().required('Match outcome is required.'),
  tierDivisionOption: yup.object().required('New rank is required.'),
  rankChange: yup
    .number()
    .required('Rank change is required.')
    .min(-100, 'Rank change must be between -100% and +100%.')
    .max(100, 'Rank change must be between -100% and +100%.'),
  date: yup
    .date()
    .typeError('Enter a valid date.')
    .max(new Date(), 'Date must be today or earlier.')
    .required('Date is required.'),
  time: yup
    .string()
    .required('Time is required.')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Enter a valid time.'),
});

enum Mode {
  Create,
  Edit,
}
export interface OwProgressFormProps {
  id?: string | null;
  onDismiss: () => void;
  onSubmit: () => void;
  onModifiedChange: (isModified: boolean) => void;
}
export default function OwProgressForm({
  id,
  onDismiss,
  onModifiedChange,
  onSubmit: onSubmitProp,
}: OwProgressFormProps) {
  const mode = id ? Mode.Edit : Mode.Create;
  const [games, setGames] = useLocalStorage<OutcomeDetails[]>(LocalStorageKey.OwGames, []);

  const initialValues = useMemo((): FormValues => {
    const existingGame = games.find((game) => game.id === id);
    if (existingGame) {
      return {
        ...existingGame,
        date: format(existingGame.date, 'yyyy-MM-dd'),
        time: format(existingGame.date, 'HH:mm'),
        tierDivisionOption:
          tierDivisionOptions.find((option) => option.value === existingGame.tierDivision) ?? null,
        modifiersOptions:
          modifierOptions.filter((option) =>
            existingGame.modifiers.includes(option.value as Modifier)
          ) ?? [],
      };
    }
    const lastGame = orderBy(games, 'date', 'desc')[0] ?? null;
    const today = new Date();
    return {
      outcome: Outcome.Win,
      tierDivisionOption:
        tierDivisionOptions.find((option) => option.value === lastGame?.tierDivision) ?? null,
      rankChange: 0,
      modifiersOptions: [],
      date: format(today, 'yyyy-MM-dd'),
      time: format(today, 'HH:mm'),
      notes: '',
    };
  }, [games, id]);

  const onSubmit = useCallback(
    (values: FormValues) => {
      const finalValues: OutcomeDetails = {
        ...values,
        id: id ?? crypto.randomUUID(),
        date: new Date(`${values.date}T${values.time}`),
        tierDivision: values.tierDivisionOption?.value as TierDivision,
        modifiers: values.modifiersOptions?.map((option) => option.value as Modifier) ?? [],
      };
      if (mode === Mode.Create) {
        setGames((prev) => [...prev, finalValues]);
      } else {
        setGames((prev) => {
          return prev.map((item) => (item.id === finalValues.id ? finalValues : item));
        });
      }
      onModifiedChange(false);
      onSubmitProp();
    },
    [mode, setGames, id, onSubmitProp, onModifiedChange]
  );

  const formik = useFormik<FormValues>({
    validationSchema,
    // Validation is handled at the field level
    validateOnChange: false,
    validateOnBlur: false,
    initialValues,
    onSubmit,
  });

  const { values, resetForm } = formik;

  useEffect(() => {
    resetForm({ values: initialValues });
  }, [resetForm, initialValues]);

  useEffect(() => {
    const isModified = !isEqual(initialValues, values);
    onModifiedChange(isModified);
  }, [initialValues, values, onModifiedChange]);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <SpaceBetween size="m">
          <SpaceBetween size="xl">
            <Section title="Match summary">
              <FormikFormField label="Outcome" name="outcome">
                <FormikTiles
                  name="outcome"
                  columns={1}
                  items={[
                    { value: Outcome.Win, label: outcomeLabels[Outcome.Win] },
                    { value: Outcome.Loss, label: outcomeLabels[Outcome.Loss] },
                    { value: Outcome.Draw, label: outcomeLabels[Outcome.Draw] },
                  ]}
                />
              </FormikFormField>
              <FormikFormField
                label="Rank change (%)"
                controlId="validation-input"
                name="rankChange"
              >
                <div className={styles.flexWrapper}>
                  <div className={styles.sliderWrapper}>
                    <FormikSlider
                      name="rankChange"
                      hideFillLine
                      referenceValues={[0]}
                      valueFormatter={(value) => `${value > 0 ? '+' : ''}${value}`}
                      max={100}
                      min={-100}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <FormikInput
                      name="rankChange"
                      type="number"
                      inputMode="numeric"
                      controlId="validation-input"
                    />
                  </div>
                </div>
              </FormikFormField>
              <FormikFormField
                name="modifiersOptions"
                label={
                  <>
                    Modifiers - <i>optional</i>
                  </>
                }
              >
                <FormikMultiselect
                  name="modifiersOptions"
                  filteringType="auto"
                  placeholder="Choose modifiers"
                  options={modifierOptions}
                />
              </FormikFormField>
              <FormikFormField name="tierDivisionOption" label="New rank">
                <FormikSelect
                  name="tierDivisionOption"
                  placeholder="Choose new rank"
                  filteringType="auto"
                  options={tierDivisionOptions}
                />
              </FormikFormField>
            </Section>

            <Section title="Match info">
              <div className={styles.flexWrapper}>
                <FormikFormField name="date" label="Date">
                  <FormikDatePicker name="date" isDateEnabled={(date) => date <= new Date()} />
                </FormikFormField>
                <FormikFormField name="time" label="Time" constraintText="Use 24-hour format.">
                  <FormikTimeInput name="time" format="hh:mm" placeholder="hh:mm" />
                </FormikFormField>
              </div>
              <FormikFormField
                name="notes"
                label={
                  <>
                    Comments - <i>optional</i>
                  </>
                }
              >
                <FormikTextarea name="notes" />
              </FormikFormField>
            </Section>
          </SpaceBetween>

          <Box float="right">
            <SpaceBetween size="xs" direction="horizontal">
              <Button formAction="none" variant="link" onClick={onDismiss}>
                Cancel
              </Button>
              <Button formAction="submit">{mode === Mode.Create ? 'Add match' : 'Save'}</Button>
            </SpaceBetween>
          </Box>
        </SpaceBetween>
      </form>
    </FormikProvider>
  );
}
