import { ProgressProvider } from '@/providers/signup-provider';
import { SignupProcess } from './signup-process';

export const Signup = () => {
  return (
    <ProgressProvider>
      <SignupProcess />
    </ProgressProvider >
  );
}
