import { useState } from 'react';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import DatePicker from '@cloudscape-design/components/date-picker';
import Multiselect from '@cloudscape-design/components/multiselect';
import Box from '@cloudscape-design/components/box';
import TimeInput from '@cloudscape-design/components/time-input';
import Container from '@cloudscape-design/components/container';
import Slider from '@cloudscape-design/components/slider';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import Input from '@cloudscape-design/components/input';
import { Formik } from 'formik';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import DhAppLayout from 'common/dh-app-layout';
import useTitle from 'utilities/use-title';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import widgetDetails from 'common/widget-details';
import { Pathname } from 'utilities/routes';
import ButtonLink from 'common/button-link';
import FormikFormField from 'common/formik/form-field';
import FormikRadioGroup from 'common/formik/radio-group';
import styles from './styles.module.scss';
import useLocalStorage, { LocalStorageKey } from 'utilities/use-local-storage';
import { Division, Modifier, Outcome, OutcomeDetails, Tier } from './types';
import { divisionLabels, modifierLabels, outcomeLabels, tierLabels } from './constants';
import { useNotifications } from 'common/use-notifications';

const tierOptions: SelectProps.Option[] = [
  { label: tierLabels[Tier.Bronze], value: Tier.Bronze },
  { label: tierLabels[Tier.Silver], value: Tier.Silver },
  { label: tierLabels[Tier.Gold], value: Tier.Gold },
  { label: tierLabels[Tier.Platinum], value: Tier.Platinum },
  { label: tierLabels[Tier.Diamond], value: Tier.Diamond },
  { label: tierLabels[Tier.Master], value: Tier.Master },
  { label: tierLabels[Tier.Grandmaster], value: Tier.Grandmaster },
  { label: tierLabels[Tier.Champion], value: Tier.Champion },
];
const divisionOptions: SelectProps.Option[] = [
  { label: divisionLabels[Division.One], value: Division.One },
  { label: divisionLabels[Division.Two], value: Division.Two },
  { label: divisionLabels[Division.Three], value: Division.Three },
  { label: divisionLabels[Division.Four], value: Division.Four },
  { label: divisionLabels[Division.Five], value: Division.Five },
];
const modifierOptions: SelectProps.Option[] = [
  {
    label: modifierLabels[Modifier.WinningTrend],
    value: Modifier.WinningTrend,
    description: 'Bonus for high win rate',
  },
  {
    label: modifierLabels[Modifier.LosingTrend],
    value: Modifier.LosingTrend,
    description: 'Penalty for high loss rate',
  },
  {
    label: modifierLabels[Modifier.Consolation],
    value: Modifier.Consolation,
    description: "You weren't favored and you lost",
  },
  {
    label: modifierLabels[Modifier.Reversal],
    value: Modifier.Reversal,
    description: 'You were favored but you lost',
  },
  {
    label: modifierLabels[Modifier.UphillBattle],
    value: Modifier.UphillBattle,
    description: "You weren't favored but you won",
  },
  {
    label: modifierLabels[Modifier.Expected],
    value: Modifier.Expected,
    description: 'You were favored and you won',
  },
  {
    label: modifierLabels[Modifier.Calibration],
    value: Modifier.Calibration,
    description: 'Your rank is uncertain',
  },
  {
    label: modifierLabels[Modifier.Demotion],
    value: Modifier.Demotion,
    description: 'You lost a match while in Demotion Protection',
  },
  {
    label: modifierLabels[Modifier.DemotionProtection],
    value: Modifier.DemotionProtection,
    description: 'If you lose again you will rank down',
  },
  {
    label: modifierLabels[Modifier.Wide],
    value: Modifier.Wide,
    description: 'Your group is wide so you gained or lost less rank',
  },
  {
    label: modifierLabels[Modifier.Pressure],
    value: Modifier.Pressure,
    description: 'You were pushed toward average at a high or low rank',
  },
];

export default function OwProgressCreate() {
  useTitle('Add game');
  const pushNotification = useNotifications((state) => state.pushNotification);
  const navigate = useNavigate();
  const [, setGames] = useLocalStorage<OutcomeDetails[]>(LocalStorageKey.OwGames, []);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const today = new Date();
  const formattedDate =
    today.getFullYear() +
    '-' +
    String(today.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(today.getDate()).padStart(2, '0');
  const timeWithPeriod = today.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const timeOnly = timeWithPeriod.replace(/\s?[AP]M/, '');
  const period =
    today
      .toLocaleTimeString('en-US', {
        hour: '2-digit',
        hour12: true,
      })
      .match(/AM|PM/)?.[0] ?? 'AM';

  return (
    <DhAppLayout
      contentType="form"
      toolsHide
      breadcrumbs={
        <DhBreadcrumbs
          items={[
            { text: widgetDetails.owProgress.title, href: Pathname.OwProgress },
            { text: 'Add game', href: Pathname.OwProgressCreate },
          ]}
        />
      }
      content={
        <Formik<OutcomeDetails>
          validationSchema={yup.object({
            outcome: yup.string().required('Choose an outcome.'),
            tier: yup.string().required('Choose a tier.'),
            division: yup.string().required('Choose a division.'),
            modifiers: yup.array().min(1, 'Choose modifiers.'),
            date: yup.string().required('Enter a date.'),
            time: yup.string().required('Enter a time.'),
            period: yup.string().required('Choose a time period.'),
          })}
          validateOnChange={submitted}
          initialValues={{
            id: crypto.randomUUID(),
            outcome: null,
            tier: null,
            division: null,
            rankChange: 0,
            modifiers: [],
            date: formattedDate,
            time: timeOnly,
            period,
          }}
          onSubmit={(values) => {
            setGames((prev) => [...prev, values]);
            navigate(Pathname.OwProgress);
            pushNotification({
              type: 'success',
              dismissible: true,
              content: 'Successfully added a game.',
              persistOnNavigate: 'once',
            });
          }}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <Form
              header={<Header variant="h1">Add game</Header>}
              actions={
                <SpaceBetween size="xs" direction="horizontal">
                  <ButtonLink href={Pathname.OwProgress} variant="link">
                    Cancel
                  </ButtonLink>
                  <Button
                    onClick={() => {
                      setSubmitted(true);
                      handleSubmit();
                    }}
                    variant="primary"
                  >
                    Add
                  </Button>
                </SpaceBetween>
              }
            >
              <Container header={<Header>Details</Header>}>
                <SpaceBetween size="l">
                  <FormikFormField name="outcome" label="Outcome">
                    <FormikRadioGroup
                      name="outcome"
                      items={[
                        { value: Outcome.Win, label: outcomeLabels[Outcome.Win] },
                        { value: Outcome.Loss, label: outcomeLabels[Outcome.Loss] },
                        { value: Outcome.Draw, label: outcomeLabels[Outcome.Draw] },
                      ]}
                    />
                  </FormikFormField>
                  <FormikFormField
                    name="rankChange"
                    label="Rank gain/loss"
                    controlId="validation-input"
                  >
                    <div className={styles.flexWrapper}>
                      <div className={styles.sliderWrapper}>
                        <Slider
                          hideFillLine
                          onChange={({ detail }) => setFieldValue('rankChange', detail.value)}
                          value={values.rankChange}
                          referenceValues={[0]}
                          valueFormatter={(value) => `${value > 0 ? '+' : ''}${value}%`}
                          max={100}
                          min={-100}
                        />
                      </div>
                      <SpaceBetween size="xs" alignItems="center" direction="horizontal">
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
                        <Box>%</Box>
                      </SpaceBetween>
                    </div>
                  </FormikFormField>
                  <FormikFormField name="modifiers" label="Modifiers">
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
                  </FormikFormField>
                  <div className={styles.flexWrapper}>
                    <div className={styles.tierInput}>
                      <FormikFormField name="tier" label="Tier">
                        <Select
                          placeholder="Choose tier"
                          onChange={(event) =>
                            setFieldValue('tier', event.detail.selectedOption.value)
                          }
                          selectedOption={
                            tierOptions.find((option) => option.value === values.tier) ?? null
                          }
                          options={tierOptions}
                        />
                      </FormikFormField>
                    </div>
                    <div className={styles.divisionInput}>
                      <FormikFormField name="division" label="Division">
                        <Select
                          placeholder="Choose division"
                          onChange={(event) =>
                            setFieldValue('division', event.detail.selectedOption.value)
                          }
                          selectedOption={
                            divisionOptions.find((option) => option.value === values.division) ??
                            null
                          }
                          options={divisionOptions}
                        />
                      </FormikFormField>
                    </div>
                  </div>

                  <div className={styles.flexWrapper}>
                    <FormikFormField name="date" label="Date">
                      <DatePicker
                        value={values.date}
                        onChange={(event) => setFieldValue('date', event.detail.value)}
                      />
                    </FormikFormField>
                    <FormikFormField name="time" label="Time">
                      <TimeInput
                        value={values.time}
                        format="hh:mm"
                        placeholder="hh:mm"
                        onChange={(event) => setFieldValue('time', event.detail.value)}
                      />
                    </FormikFormField>
                    <FormikFormField name="period" label="Period">
                      <Select
                        placeholder="Choose time period"
                        options={[
                          { label: 'AM', value: 'AM' },
                          { label: 'PM', value: 'PM' },
                        ]}
                        selectedOption={{ label: values.period, value: values.period }}
                        onChange={(event) =>
                          setFieldValue('period', event.detail.selectedOption.value)
                        }
                      />
                    </FormikFormField>
                  </div>
                </SpaceBetween>
              </Container>
            </Form>
          )}
        </Formik>
      }
    />
  );
}
