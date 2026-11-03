import { useState } from 'react';
import dayjs from 'dayjs';
import {
  Alert,
  Button,
  Checkbox,
  Code,
  Container,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { schemaResolver, useForm } from '@mantine/form';
import { emptyValues, type FormValues } from './formValues';
import { mobilityOptions } from './mobilityOptions';
import { sampleAssessment } from './sample';
import { assessmentSchema, type Assessment } from './schema';

type Props = {
  onSave: (values: Assessment) => Promise<void>;
};

export function AssessmentForm({ onSave }: Props) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<Assessment | null>(null);

  const form = useForm<FormValues, (values: FormValues) => Assessment>({
    initialValues: emptyValues,
    validate: schemaResolver(assessmentSchema, { sync: true }),
    validateInputOnBlur: true,
    // validation has already passed by the time this runs, so parse won't throw.
    // It gives us the trimmed, typed values that the schema actually produces.
    transformValues: (values) => assessmentSchema.parse(values),
  });

  const handleSubmit = async (values: Assessment) => {
    setSaving(true);
    setSaved(null);
    try {
      await onSave(values);
      setSaved(values);
    } finally {
      setSaving(false);
    }
  };

  const loadSample = () => {
    form.setValues(sampleAssessment);
    form.clearErrors();
    setSaved(null);
  };

  return (
    <Container size="sm" my="xl">
      <Paper withBorder p="lg">
        <Title order={2} mb="md">
          Geriatric Care Assessment
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Medical record number"
              placeholder="MRN-004821"
              {...form.getInputProps('mrn')}
            />
            <TextInput label="Patient name" {...form.getInputProps('patientName')} />
            <DateInput label="Date of birth" clearable {...form.getInputProps('dateOfBirth')} />
            <DateInput
              label="Assessment date"
              maxDate={dayjs().format('YYYY-MM-DD')}
              clearable
              {...form.getInputProps('assessmentDate')}
            />
            <Select
              label="Mobility"
              placeholder="Select mobility"
              data={mobilityOptions}
              {...form.getInputProps('mobility')}
            />
            <NumberInput
              label="Barthel Index"
              step={5}
              min={0}
              max={100}
              clampBehavior="none"
              {...form.getInputProps('barthelIndex')}
            />
            <NumberInput
              label="Regular medications"
              min={0}
              max={30}
              clampBehavior="none"
              {...form.getInputProps('medicationCount')}
            />
            <Checkbox
              label="Pharmacist review requested"
              {...form.getInputProps('pharmacistReviewRequested', { type: 'checkbox' })}
            />
            <DateInput label="Next review date" clearable {...form.getInputProps('followUpDate')} />
            <Checkbox
              label="Patient or representative has given consent"
              {...form.getInputProps('consentObtained', { type: 'checkbox' })}
            />

            <Group justify="space-between">
              <Button type="button" variant="default" onClick={loadSample} disabled={saving}>
                Load sample patient
              </Button>
              <Button type="submit" loading={saving} disabled={saving}>
                Save assessment
              </Button>
            </Group>
          </Stack>
        </form>

        {saved && (
          <Alert color="green" title="Assessment saved" mt="md">
            <Code block>{JSON.stringify(saved, null, 2)}</Code>
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
