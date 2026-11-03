import { describe, expect, it } from 'vitest';
import { sampleAssessment } from './sample';
import { assessmentSchema } from './schema';

// assessment date in the sample is 2026-08-07, so 60 years earlier is 1966-08-07
describe('assessmentSchema age rule', () => {
  it('accepts someone turning 60 on the assessment date and rejects one day short', () => {
    const turns60 = assessmentSchema.safeParse({ ...sampleAssessment, dateOfBirth: '1966-08-07' });
    const oneDayShort = assessmentSchema.safeParse({
      ...sampleAssessment,
      dateOfBirth: '1966-08-08',
    });

    expect(turns60.success).toBe(true);
    expect(oneDayShort.success).toBe(false);
    if (!oneDayShort.success) {
      expect(oneDayShort.error.issues.map((issue) => issue.path[0])).toEqual(['dateOfBirth']);
    }
  });
});
