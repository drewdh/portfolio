import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import DatePicker from '@cloudscape-design/components/date-picker';
import Multiselect from '@cloudscape-design/components/multiselect';
import Box from '@cloudscape-design/components/box';
import TimeInput from '@cloudscape-design/components/time-input';
import Slider from '@cloudscape-design/components/slider';
import Select from '@cloudscape-design/components/select';
import Input from '@cloudscape-design/components/input';
import Textarea from '@cloudscape-design/components/textarea';
import FormField from '@cloudscape-design/components/form-field';
import Tiles from '@cloudscape-design/components/tiles';
import { useFormik } from 'formik';
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';
import { parse } from 'date-fns/parse';
import * as yup from 'yup';
import { useLocalStorage } from 'usehooks-ts';

import styles from './styles.module.scss';
import { LocalStorageKey } from 'utilities/local-storage-keys';
import { Division, Outcome, OutcomeDetails } from './types';
import { divisionOptions, modifierOptions, outcomeLabels, tierOptions } from './constants';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <SpaceBetween size="s">
      <Header>{title}</Header>
      <SpaceBetween size="m">{children}</SpaceBetween>
    </SpaceBetween>
  );
}

const validationSchema = yup.object({
  outcome: yup.string().required('Choose an outcome.'),
  tier: yup.string().required('Choose a tier.'),
  division: yup.string().required('Choose a division.'),
  date: yup.string().required('Enter a date.'),
  time: yup.string().required('Enter a time.'),
});

enum Mode {
  Create,
  Edit,
}
export interface OwProgressFormProps {
  id?: string | null;
  onDismiss: () => void;
  onModifiedChange: (isModified: boolean) => void;
}
export default function OwProgressForm({
  id: idProp,
  onDismiss,
  onModifiedChange,
}: OwProgressFormProps) {
  const mode = idProp ? Mode.Edit : Mode.Create;
  const [games, setGames] = useLocalStorage<OutcomeDetails[]>(LocalStorageKey.OwGames, []);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const id = useMemo((): string => {
    return idProp ? idProp : crypto.randomUUID();
  }, [idProp]);

  const lastGame = useMemo((): OutcomeDetails | null => {
    return (
      sortBy(games, (game) => {
        const fullDateTimeStr = `${game.date} ${game.time}`;
        return parse(fullDateTimeStr, 'yyyy-MM-dd HH:mm', new Date());
      }).reverse()[0] ?? null
    );
  }, [games]);

  const initialValues = useMemo((): OutcomeDetails => {
    const existingGame = games.find((game) => game.id === id);
    if (existingGame) {
      return existingGame;
    }
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const time = today.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return {
      id,
      outcome: Outcome.Win,
      tier: lastGame?.tier ?? null,
      division: lastGame?.division ?? Division.One,
      rankChange: 0,
      modifiers: [],
      date: formattedDate,
      time,
      notes: '',
    };
  }, [games, id, lastGame]);

  const onSubmit = useCallback(
    (values: OutcomeDetails) => {
      if (mode === Mode.Create) {
        setGames((prev) => [...prev, values]);
      } else {
        setGames((prev) => {
          return prev.map((item) => (item.id === values.id ? values : item));
        });
      }
      onDismiss();
    },
    [mode, onDismiss, setGames]
  );

  const { values, setFieldValue, handleSubmit, errors, resetForm } = useFormik<OutcomeDetails>({
    validationSchema,
    validateOnChange: submitted,
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    resetForm({ values: initialValues });
  }, [id, initialValues, resetForm]);

  useEffect(() => {
    const isModified = !isEqual(initialValues, values);
    onModifiedChange(isModified);
  }, [initialValues, values, onModifiedChange]);

  return (
    <SpaceBetween size="m">
      <SpaceBetween size="xl">
        <Section title="Match summary">
          <FormField label="Outcome" errorText={errors.outcome}>
            <Tiles
              columns={1}
              onChange={(event) => setFieldValue('outcome', event.detail.value)}
              value={values.outcome}
              items={[
                { value: Outcome.Win, label: outcomeLabels[Outcome.Win] },
                { value: Outcome.Loss, label: outcomeLabels[Outcome.Loss] },
                { value: Outcome.Draw, label: outcomeLabels[Outcome.Draw] },
              ]}
            />
          </FormField>
          <FormField
            label="Rank gain/loss (%)"
            controlId="validation-input"
            errorText={errors.rankChange}
          >
            <div className={styles.flexWrapper}>
              <div className={styles.sliderWrapper}>
                <Slider
                  hideFillLine
                  onChange={({ detail }) => setFieldValue('rankChange', detail.value)}
                  value={values.rankChange}
                  referenceValues={[0]}
                  valueFormatter={(value) => `${value > 0 ? '+' : ''}${value}`}
                  max={100}
                  min={-100}
                />
              </div>
              <div className={styles.inputWrapper}>
                <Input
                  type="number"
                  inputMode="numeric"
                  value={values.rankChange.toString()}
                  onChange={({ detail }) => {
                    setFieldValue('rankChange', Number(detail.value));
                  }}
                  controlId="validation-input"
                />
              </div>
            </div>
          </FormField>
          <FormField
            errorText={errors.modifiers}
            label={
              <>
                Modifiers - <i>optional</i>
              </>
            }
          >
            <Multiselect
              filteringType="auto"
              placeholder="Choose modifiers"
              onChange={(event) => {
                setFieldValue(
                  'modifiers',
                  event.detail.selectedOptions.map((option) => option.value)
                );
              }}
              selectedOptions={values.modifiers.map(
                (modifier) => modifierOptions.find((option) => option.value === modifier)!
              )}
              options={modifierOptions}
            />
          </FormField>
          <FormField errorText={errors.tier} label="New rank">
            <SpaceBetween size="s" direction="horizontal">
              <Select
                ariaLabel="Skill tier"
                placeholder="Choose skill tier"
                onChange={(event) => setFieldValue('tier', event.detail.selectedOption.value)}
                selectedOption={tierOptions.find((option) => option.value === values.tier) ?? null}
                options={tierOptions}
              />
              <Select
                ariaLabel="Division"
                placeholder="Choose division"
                onChange={(event) => setFieldValue('division', event.detail.selectedOption.value)}
                selectedOption={
                  divisionOptions.find((option) => option.value === values.division) ?? null
                }
                options={divisionOptions}
              />
            </SpaceBetween>
          </FormField>
        </Section>

        <Section title="Match info">
          <div className={styles.flexWrapper}>
            <FormField errorText={errors.date} label="Date">
              <DatePicker
                value={values.date}
                onChange={(event) => setFieldValue('date', event.detail.value)}
              />
            </FormField>
            <FormField errorText={errors.time} label="Time" constraintText="Use 24-hour format.">
              <TimeInput
                value={values.time}
                format="hh:mm"
                placeholder="hh:mm"
                onChange={(event) => setFieldValue('time', event.detail.value)}
              />
            </FormField>
          </div>
          <FormField
            errorText={errors.notes}
            label={
              <>
                Comments - <i>optional</i>
              </>
            }
          >
            <Textarea
              onChange={(event) => setFieldValue('notes', event.detail.value)}
              value={values.notes}
            />
          </FormField>
        </Section>
      </SpaceBetween>

      <Box float="right">
        <SpaceBetween size="xs" direction="horizontal">
          <Button variant="link" onClick={onDismiss}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setSubmitted(true);
              handleSubmit();
            }}
          >
            {mode === Mode.Create ? 'Add match' : 'Save'}
          </Button>
        </SpaceBetween>
      </Box>
    </SpaceBetween>
  );
}
