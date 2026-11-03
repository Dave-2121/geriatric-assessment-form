import { AssessmentForm } from '@/features/assessment/AssessmentForm';
import { fakeSave } from '@/features/assessment/fakeSave';

export function HomePage() {
  return <AssessmentForm onSave={fakeSave} />;
}
