import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// @types
type LabeledInputProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const LabeledInput = ({ label, ...props }: LabeledInputProps) => {
  return (
    <div className="flex flex-col">
      <Label className="text-sm font-light text-tertiary pb-2">{label}</Label>
      <Input {...props} />
    </div>
  );
};
