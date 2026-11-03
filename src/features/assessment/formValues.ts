import type { Assessment } from './schema';

// Fields that can sit empty while the nurse is still filling the form.
// Dates and the select use null, number inputs use '' (that is what Mantine gives us).
type Blankable =
  | 'dateOfBirth'
  | 'assessmentDate'
  | 'followUpDate'
  | 'mobility'
  | 'barthelIndex'
  | 'medicationCount';

// Same keys as Assessment, just loosened where an empty form can't match it.
// The resolver turns this back into a proper Assessment on submit.
export type FormValues = {
  [K in keyof Assessment]: K extends 'consentObtained'
    ? boolean
    : K extends Blankable
      ? Assessment[K] | null | ''
      : Assessment[K];
};

export const emptyValues: FormValues = {
  mrn: '',
  patientName: '',
  dateOfBirth: null,
  assessmentDate: null,
  mobility: null,
  barthelIndex: '',
  medicationCount: '',
  pharmacistReviewRequested: false,
  followUpDate: null,
  consentObtained: false,
};
